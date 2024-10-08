import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import Filter from "@/components/shared/Filter";
import { redirect } from "next/navigation";
import React from "react";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Dev-overflow",
  description:
    "Stack overflow clone - A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  const users = result?.users || []; // Default to an empty array if undefined

  return (
    <>
      <div className="flex w-full sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          imgSrc="assets/icons/search.svg"
          placeholder="Search by username..."
        />
        <Filter
          placeholder="Select a Filter"
          pageFilters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-11 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="text-dark200_light800 paragraph-regular mx-auto w-full gap-8 text-center">
            <p>No user found</p>
            <Link href="/sign-up" className="mt-8 text-primary-500">
              Join to be the first one
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
