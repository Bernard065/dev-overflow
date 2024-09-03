import { RenderTagProps } from "@/types";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

const RenderTag = ({
  _id,
  title,
  totalQuestions,
  showCount,
}: RenderTagProps) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        variant="outline"
        className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase"
      >
        {title}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
