import { QuestionCardProps } from "@/types";
import Link from "next/link";
import React from "react";
import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

const QuestionCard = ({
  _id,
  questionTitle,
  answers,
  tags = [],
  author,
  views,
  upvotes,
  downvotes,
  createdAt,
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-xl p-9">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {questionTitle}
            </h3>
          </Link>
        </div>

        {/* If signed in, add edit and delete buttons here */}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            title={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <div className="flex-between mt-6 flex w-full flex-wrap gap-3">
        <div className="flex flex-wrap">
          <Link href={`/profile/${author._id}`}>
            <Metric
              imgUrl={author.picture}
              alt="user"
              title={` - asked ${getTimestamp(createdAt)}`}
              value={author.name}
              href={`/profile/${author._id}`}
              isAuthour
              textStyles="small-medium text-dark400_light800"
            />
          </Link>
        </div>
        <div className="flex-between flex-wrap gap-4">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            title="Votes"
            value={formatAndDivideNumber((upvotes.length) + (downvotes.length))}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="mesage"
            title="Answers"
            value={formatAndDivideNumber(answers.length)}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            title="Views"
            value={formatAndDivideNumber(views)}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
