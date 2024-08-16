import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants";
import Link from "next/link";

const Home = () => {
  const questions = [
    {
      _id: "1",
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
      tags: {
        _id: "1",
        name: "Python",
      },
      author: {
        _id: "1",
        name: "Bernard Bebeni",
        picture: "/assets/images/bernard-bebeni.png", // Update with the actual path
      },
      upvotes: 10,
      views: 100,
      answers: [
        {
          _id: "1",
          content: "You can use getServerSideProps for SSR in Next.js.",
        },
        {
          _id: "2",
          content: "Consider using SWR for efficient data fetching.",
        },
      ],
      createdAt: new Date("2024-08-16"),
    },
    {
      _id: "2",
      title: "Redux Toolkit Not Updating State as Expected",
      tags: {
        _id: "2",
        name: "JavaScript",
      },
      author: {
        _id: "1",
        name: "Bernard Bebeni",
        picture: "/assets/images/bernard-bebeni.png", // Update with the actual path
      },
      upvotes: 10,
      views: 100,
      answers: [
        { _id: "3", content: "Check if your reducers are pure functions." },
        { _id: "4", content: "Ensure you're not mutating the state directly." },
      ],
      createdAt: new Date("2024-08-16"),
    },
    {
      _id: "3",
      title:
        "How do ES6 module exports and imports work in JavaScript, and what are the key differences from CommonJS?",
      tags: {
        _id: "2",
        name: "JavaScript",
      },
      author: {
        _id: "1",
        name: "Bernard Bebeni",
        picture: "/assets/images/bernard-bebeni.png", // Update with the actual path
      },
      upvotes: 10,
      views: 100,
      answers: [
        { _id: "5", content: "ES6 modules allow named exports and imports." },
        { _id: "6", content: "CommonJS uses require and module.exports." },
      ],
      createdAt: new Date("2024-08-16"),
    },
  ];

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
          imgSrc="assets/icons/search.svg"
          placeholder="Search for questions..."
        />

        <Filter
          placeholder="Select a Filter"
          pageFilters={HomePageFilters}
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilter />

      <div className="mt-11 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
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
    </>
  );
};

export default Home;
