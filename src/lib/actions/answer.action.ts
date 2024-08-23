"use server";

import { CreateAnswerParams } from "@/types";
import { connectToDatabase } from "../mongoose/mongoose";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { author, question, content, path } = params;

    // Create a new answer
    const newAnswer = new Answer({ author, question, content });

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