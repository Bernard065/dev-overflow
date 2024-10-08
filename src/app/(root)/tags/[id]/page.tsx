import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import type { Metadata } from "next";
import React from "react";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const result = await getQuestionsByTagId({
    tagId: id,
    searchQuery: '',
    page: 1,
  });

  const tagTitle = result?.tagTitle || "Questions";
  const description = `Explore all questions tagged with ${tagTitle}. Find answers, ask new questions, and join the discussion.`;

  return {
    title: `${tagTitle} - Questions`,
    description,
  };
}


const Page = async ({ params, searchParams }: Props) => {
  const { id } = params;

  const result = await getQuestionsByTagId({
    tagId: id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
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

      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={result?.isNext}
      />
    </>
  );
};

export default Page;
