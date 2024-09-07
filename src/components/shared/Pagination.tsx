"use client";
import React from "react";
import { Button } from "../ui/button";

const Pagination = () => {
  const handleNavigation = (direction: string) => {};
  return (
    <div>
      <Button
        disabled={false}
        onClick={() => handleNavigation("prev")}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        Prev
      </Button>
    </div>
  );
};

export default Pagination;
