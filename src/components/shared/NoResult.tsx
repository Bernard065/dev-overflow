import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { NoResultsProps } from "@/types";

const NoResult = ({
  title,
  description,
  link,
  buttonTitle,
}: NoResultsProps) => {
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
        <h2 className="h2-bold text-dark100_light900">{title}</h2>
        <p className="text-dark100_light900 flex items-center justify-center text-center">
          {description}
        </p>
        <Link href={link} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] rounded-lg !text-light-900">
            {buttonTitle}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoResult;
