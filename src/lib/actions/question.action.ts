"use server";

import { connectToDatabase } from "../mongoose/mongoose";

export async function createQuestion(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}
