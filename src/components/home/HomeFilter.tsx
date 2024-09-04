"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isActive, setIsActive] = useState("newest");

  const handleTypeClick = (item: string) => {
    if (isActive === item) {
      setIsActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setIsActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            isActive === item.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-200"
          }`}
          onClick={() => handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
