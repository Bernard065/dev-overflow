import { QuestionCardProps } from "@/types";
import Link from "next/link";
import React from "react";
import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";

const QuestionCard = ({
  _id,
  title,
  answers,
  tags = [],
  author,
  views,
  upvotes,
  createdAt,
}: QuestionCardProps) => {
  return (
    <div className="card-wrapper rounded-xl p-9">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {String(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
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

      <div>
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
