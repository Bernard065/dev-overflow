import { Questionprops } from "@/types";
import Link from "next/link";
import React from "react";

const QuestionCard = ({
  questionTitle,
  answers,
  questionTag,
  author,
  views,
  votes,
  createdAt,
}: Questionprops) => {
  return (
    <div className="background-light800_dark300 min-h-[210px] rounded-md border-none px-6 py-3">
      <div>
        <Link href="/question" className="">
          {questionTitle}
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
