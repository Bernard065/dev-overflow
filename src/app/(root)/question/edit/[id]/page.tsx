import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();

  const { id } = params;

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  const questionDetails = await getQuestionById(id);


  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-dark100_light900 h1-bold">Edit Question</h1>

      <div className="mt-9">
        <QuestionForm
          type="edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(questionDetails)}
        />
      </div>
    </div>
  );
};

export default Page;
