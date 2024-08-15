"use client";

import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import { CustomInputProps } from "@/types";

const LocalSearch = ({ route, imgSrc, placeholder }: CustomInputProps) => {
  return (
    <div className="background-light800_darkgradient relative flex min-h-[56px] flex-1 grow items-center gap-1 rounded-xl px-4">
      <Image
        src={imgSrc}
        alt="search"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
