import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants";
import Link from "next/link";

const Home = () => {
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
    </>
  );
};

export default Home;
