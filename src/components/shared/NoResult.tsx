import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NoResult = () => {
  return (
    <div className="mt-11 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result"
        width={300}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result"
        width={300}
        height={200}
        className="hidden object-contain dark:flex "
      />
      <div className="flex w-full flex-col items-center justify-center gap-4 pt-4">
        <h2 className="h2-bold text-dark100_light900">
          There is no question to show
        </h2>
        <p className="text-dark100_light900 flex items-center justify-center">
          Be the first to spark a conversation! 🚀 Ask a question and ignite the
          discussion - your query could be the next big thing others learn from.
          Get involved! 🌟
        </p>
      </div>
      <Link href="/ask-question" className="flex justify-end max-sm:w-full">
        <Button className="primary-gradient min-h-[46px] rounded-lg !text-light-900">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
