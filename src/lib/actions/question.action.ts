"use server";

import { connectToDatabase } from "@/lib/mongoose/mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionsParams,
  GetUserStatsParams,
  QuestionVoteParams,
} from "@/types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    // Destructure the params object to get the question details
    const { questionTitle, explanation, tags, author, path } = params;

    // Create a new question document in the database
    const question = await Question.create({
      questionTitle,
      explanation,
      author,
    });

    // Array to store tag documents that are created or found
    const tagDocuments = [];

    // Find or create tags
    // Iterate over each tag in the tags array
    for (const tag of tags) {
      // Try to find an existing tag in the database
      // If it doesn't exist, insert a new tag document with the name.
      // In both cases, add the question ID to the 'questions' array of the tag document.
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      // Add the tag document to the tagDocuments array
      tagDocuments.push(existingTag);
    }

    // Update the specified question document to add the associated tags
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment the user's reputation by 5 points for creating a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Function to get all questions from the database
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
  }
}

// Action to get a question by ID
export async function getQuestionById(id: string) {
  try {
    connectToDatabase();

    const question = await Question.findById(id)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
  }
}

// Action to upvote a question
export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment the user's reputation for upvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Action to downvote a question
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasdownVoted, hasupVoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment the user's reputation for downvoting a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// action to get questions belonging to a specific user
export async function getQuestionsByUser(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
  }
}

// Action to delete a question
export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });

    await Answer.deleteMany({ question: questionId });

    await Interaction.deleteMany({ question: questionId });

    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Action to edit a question
export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, questionTitle, explanation, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.questionTitle = questionTitle;
    question.explanation = explanation;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
