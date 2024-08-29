import { getUserAnswers } from "@/lib/actions/answer.action";
import { TabProps } from "@/types";
import React from "react";
import NoResult from "./NoResult";
import AnswerCard from "../cards/AnswerCard";

const AnswerTab = async ({ userId, clerkId, searchParams }: TabProps) => {
  const result = await getUserAnswers({ userId, page: 1 });

  return (
    <div className="mt-11 flex w-full flex-col gap-6">
      {result?.answers && result.answers.length > 0 ? (
        result.answers.map((answer) => (
          <AnswerCard
            key={answer._id}
            clerkId={clerkId}
            authorId={JSON.stringify(answer.author._id)}
            authorPicture={answer.author.picture}
            questionId={answer.question._id}
            questionTitle={answer.question.questionTitle}
            authorName={answer.author.name}
            upvotes={answer.upvotes}
            createdAt={answer.createdAt}
          />
        ))
      ) : (
        <NoResult
          link="/ask-question"
          title="There is no question to show"
          description="You have not asked any questions yet."
          buttonTitle="Ask a Question"
        />
      )}
    </div>
  );
};

export default AnswerTab;
