import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import Filter from "@/components/shared/Filter";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { AnswerFilters } from "@/constants";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const result = await getQuestionById(id);

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <div className="flex-start flex w-full flex-col">
        <div className="flex w-full justify-between">
          <Link
            href={`/profile/${result?.author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <div className="size-6 overflow-hidden rounded-full">
              <Image
                src={result?.author.picture}
                alt="user"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <p className="paragraph-semibold text-dark300_light700">
              {result?.author.name}
            </p>
          </Link>

          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              downvotes={result.downvotes.length}
              hasUpvoted={result.upvotes.includes(mongoUser._id)}
              hasDownvoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result?.questionTitle}
        </h2>
      </div>

      <div className="mt-6 flex w-full flex-wrap gap-5">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="user"
          value=""
          title={`asked ${getTimestamp(result?.createdAt)}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          title="Votes"
          value={formatAndDivideNumber(result?.upvotes.length)}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="mesage"
          title="Answers"
          value={formatAndDivideNumber(result?.answers.length)}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          title="Views"
          value={formatAndDivideNumber(result?.views)}
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result?.explanation} />

      <div className="mt-8 flex flex-wrap gap-3">
        {result?.tags.map((tag: any) => (
          <RenderTag key={tag.id} _id={tag.id} title={tag.name} />
        ))}
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="mesage"
          title="Answers"
          value={formatAndDivideNumber(result?.answers.length)}
          textStyles="body-bold text-primary-500"
        />
        <Filter
          placeholder="Select a Filter"
          pageFilters={AnswerFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <AllAnswers
        questionId={result._id}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result?.answers.length}
      />

      <AnswerForm
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;
