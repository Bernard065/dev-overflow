"use server";

import { GetTopInteractedTagsParams } from "@/types";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose/mongoose";

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
