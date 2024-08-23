import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("The id is", id);

  const result = await getQuestionById(id);

  console.log("The result is", result);

  return (
    <>
      <div className="flex-start flex w-full flex-col">
        <div className="flex w-full justify-between">
          <Link
            href={`/profile/${result?.author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <div className="size-6 overflow-hidden rounded-full">
              <Image
                src={result?.author.picture}
                alt="user"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <p className="paragraph-semibold text-dark300_light700">
              {result?.author.name}
            </p>
          </Link>

          <div className="flex justify-end">VOTING</div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result?.questionTitle}
        </h2>
      </div>

      <div className="mt-6 flex w-full flex-wrap gap-5">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="user"
          value=""
          title={`asked ${getTimestamp(result?.createdAt)}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          title="Votes"
          value={formatAndDivideNumber(result?.upvotes.length)}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="mesage"
          title="Answers"
          value={formatAndDivideNumber(result?.answers.length)}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          title="Views"
          value={formatAndDivideNumber(result?.views)}
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result?.explanation} />
    </>
  );
};

export default Page;
