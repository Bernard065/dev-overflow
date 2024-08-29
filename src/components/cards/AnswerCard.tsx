import { AnswerCardProps } from "@/types";
import Link from "next/link";
import React from "react";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

const AnswerCard = ({
  authorId,
  clerkId,
  authorName,
  authorPicture,
  questionTitle,
  questionId,
  upvotes,
  createdAt,
}: AnswerCardProps) => {

  return (
    <div className="card-wrapper rounded-xl p-9">
      <div>
        <Link href={`/question/${questionId}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {questionTitle}
          </h3>
        </Link>
      </div>

      <SignedIn>
        {clerkId && (
          <EditDeleteAction type="answer" itemId={JSON.stringify(questionId)} />
        )}
      </SignedIn>

      <div className="flex-between mt-6 flex w-full flex-wrap gap-3">
        <div className="flex flex-wrap">
          <Link href={`/profile/${authorId}`}>
            <Metric
              imgUrl={authorPicture}
              alt="user"
              title={` - asked ${getTimestamp(createdAt)}`}
              value={authorName}
              href={`/profile/${authorId}`}
              textStyles="small-medium text-dark400_light800"
            />
          </Link>
        </div>
        <div className="flex-between flex-wrap gap-4">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            title="Votes"
            value={formatAndDivideNumber(upvotes.length)}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
