"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean | undefined;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const newPageNumber =
      direction === "next" ? pageNumber + 1 : pageNumber - 1;

    // Ensure that the page number is not less than 1
    if (newPageNumber < 1) return;

    // update the URL with the new page number
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPageNumber.toString());

    // Navigate to the new page with updated search parameters
    router.push(`?${newSearchParams.toString()}`);
  };

  if (!isNext && pageNumber === 1) {
    return null;
  }

  return (
    <div className="mt-5 flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
