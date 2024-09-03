import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getTopQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.action";

const RightSideBar = async () => {
  const topQuestions = await getTopQuestions();

  const popularTags = await getTopTags();

  return (
    <section className="background-light900_dark200 custom-scrollbar sticky right-0 top-0 flex h-screen w-[330px] flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <div>
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {topQuestions?.questions.map((question) => (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.questionTitle}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron-right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {popularTags?.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                title={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
