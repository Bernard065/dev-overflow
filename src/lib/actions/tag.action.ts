"use server";

import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "@/types";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose/mongoose";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // TODO: Implement the logic to get the top interacted tags

    return [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "React" },
      { id: 3, name: "NextJs" },
    ];
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
  }
}

// Action to get questions by tagId
export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, searchQuery } = params;

    const query: FilterQuery<typeof Tag> = { _id: tagId };

    const tag = await Tag.findOne(query).populate({
      path: "questions",
      model: "Question",
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;


    return { questions, tagTitle: tag.name };
  } catch (error) {
    console.log(error);
  }
}
