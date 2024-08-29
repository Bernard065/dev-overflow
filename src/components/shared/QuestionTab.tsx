import { getQuestionsByUser } from "@/lib/actions/question.action";
import React from "react";
import NoResult from "./NoResult";
import QuestionCard from "../cards/QuestionCard";
import { TabProps } from "@/types";



const QuestionTab = async ({
  userId,
  clerkId,
  searchParams,
}: TabProps) => {
  const result = await getQuestionsByUser({ userId, page: 1, pageSize: 10 });

  return (
    <>
      <div className="mt-11 flex w-full flex-col gap-6">
        {result?.questions && result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              clerkId={clerkId}
              questionTitle={question.questionTitle}
              answers={question.answers}
              tags={question.tags}
              author={question.author}
              views={question.views}
              upvotes={question.upvotes}
              createdAt={question.createdAt}
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
    </>
  );
};

export default QuestionTab;
