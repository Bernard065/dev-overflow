import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Dev-overflow",
  description:
    "Stack overflow clone - A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  let result;

  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] rounded-lg !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />

        <Filter
          placeholder="Select a Filter"
          pageFilters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilter />

      <div className="mt-11 flex w-full flex-col gap-6">
        {result?.questions && result.questions.length > 0 ? (
          result.questions.map((question) => (
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
            title="There is no question to show"
            description="Be the first to spark a conversation! 🚀 Ask a question and ignite the discussion - your query could be the next big thing others learn from. Get involved! 🌟"
            link="/ask-question"
            buttonTitle="Ask a Question"
          />
        )}
      </div>

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result?.isNext}
      />
    </>
  );
};

export default Home;
