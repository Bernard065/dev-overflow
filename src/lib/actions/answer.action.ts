"use server";

import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "@/types";
import { connectToDatabase } from "../mongoose/mongoose";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { author, question, content, path } = params;

    // Create a new answer
    const newAnswer = await Answer.create({ author, question, content });

    // Add the new answer to the question
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction to the user

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllAnswer(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    console.log("The questionId", questionId);

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.error(error);
  }
}

// Action to upvote an answer
export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment the user's reputation for upvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Action to downvote an answer
export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment the user's reputation for downvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
