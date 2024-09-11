import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
