import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TagFilters } from "@/constants";
import { getAllTags } from "@/lib/actions/tag.action";
import { formatAndDivideNumber } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";


const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  const tags = result?.tags || []; // Default to an empty array if undefined



  return (
    <>
      <div className="flex w-full sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          imgSrc="assets/icons/search.svg"
          placeholder="Search by tag name..."
        />
        <Filter
          placeholder="Select a Filter"
          pageFilters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-11 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag._id}`}
              className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
            >
              <div className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
                <Badge
                  variant="outline"
                  className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase"
                >
                  {tag.name}
                </Badge>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-1.5">
                    {formatAndDivideNumber(tag.questions?.length)}+
                  </span>
                  Questions
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-dark200_light800 paragraph-regular mx-auto w-full gap-8 text-center">
            <p>No tag found</p>
            <Link
              href="/ask-question"
              className="mt-8 flex justify-center max-sm:w-full"
            >
              <Button className="primary-gradient min-h-[46px] rounded-lg !text-light-900">
                Ask a Question
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result?.isNext}
      />
    </>
  );
};

export default Page;
