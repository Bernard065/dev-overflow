import { getAllAnswer } from "@/lib/actions/answer.action";
import { AllAnswersProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ParseHTML from "./ParseHTML";
import { getTimestamp } from "@/lib/utils";

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: AllAnswersProps) => {
  const result = await getAllAnswer({ questionId });

  console.log("The answers", result?.answers);

  return (
    <div className="mt-11">
      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1.5 sm:items-center"
              >
                <div className="size-5 overflow-hidden rounded-full">
                  <Image
                    src={answer.author.picture}
                    width={20}
                    height={20}
                    alt="profile"
                    className="object-cover max-sm:mt-0.5"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>

                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    &nbsp; - answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                Voting
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
