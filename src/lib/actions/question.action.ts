"use server";

import { connectToDatabase } from "@/lib/mongoose/mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
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
  } catch (error) {
    console.log(error);
  }
}
