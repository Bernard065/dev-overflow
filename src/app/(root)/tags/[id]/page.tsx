import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import React from "react";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const { id } = params;

  const result = await getQuestionsByTagId({
    tagId: id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <div className="flex w-full sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{result?.tagTitle}</h1>
      </div>

      <div className="mt-11 flex w-full flex-col gap-6">
        <LocalSearch
          route={`/tags/${id}`}
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-11 flex w-full flex-col gap-6">
        {result?.questions && result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
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
            title="You have no question"
            description="Ask a question to view them here later"
            link="/ask-question"
            buttonTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Page;
