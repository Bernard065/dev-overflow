"use server";

import { ViewQuestionParams } from "@/types";
import { connectToDatabase } from "../mongoose/mongoose";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });

      if (existingInteraction) {
        return console.log("User already viewed this question");
      } else {
        // Create an interaction
        await Interaction.create({
          user: userId,
          question: questionId,
          action: "view",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
