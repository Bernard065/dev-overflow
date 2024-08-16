import { QuestionCardProps } from "@/types";
import Link from "next/link";
import React from "react";

const QuestionCard = ({
  _id,
  title,
  answers,
  tags,
  author,
  views,
  upvotes,
  createdAt,
}: QuestionCardProps) => {
  return (
    <div className="background-light800_dark300 rounded-xl p-9">
      <div>
        test
      </div>
    </div>
  );
};

export default QuestionCard;
