"use client";

import { deleteAnswers } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { EditDeleteProps } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";

const EditDeleteAction = ({ type, itemId }: EditDeleteProps) => {
  const pathname = usePathname();

  const handleEdit = () => {};

  const handleDelete = async () => {
    if (type === "question") {
      // Delete question
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
    } else if (type === "answer") {
      // Delete answer
      await deleteAnswers({ answerId: JSON.parse(itemId), path: pathname });
    }
  };

  return (
    <div className="flex gap-3 justify-end items-center max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="edit"
          width={12}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
