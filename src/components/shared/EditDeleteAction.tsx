"use client";

import { deleteAnswers } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { EditDeleteProps } from "@/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const EditDeleteAction = ({ type, itemId }: EditDeleteProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

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
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
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
