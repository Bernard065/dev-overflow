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

// Action to get top tags
export async function getTopTags() {
  try {
    connectToDatabase();

    const tags = await Tag.aggregate([
      {
        $project: { name: 1, totalQuestions: { $size: "$questions" } },
      },
      { $sort: { totalQuestions: -1 } },
      { $limit: 5 },
    ]);

    return tags;
  } catch (error) {
    console.log(error);
  }
}

// Action to get all tags
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    const tags = await Tag.find(query);

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
        ? { questionTitle: { $regex: searchQuery, $options: "i" } }
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
