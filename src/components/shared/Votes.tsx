"use client";

import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { formatAndDivideNumber } from "@/lib/utils";
import { VotesProps } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved,
}: VotesProps) => {
  const pathname = usePathname();

  const handleVote = async (action: string) => {
    try {
      if (!userId) return null;

      if (action === "upvote") {
        if (type === "question") {
          // Call upvoteQuestion action
          await upvoteQuestion({
            questionId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasdownVoted,
            hasupVoted,
            path: pathname,
          });
        }
        return;
      }

      if (action === "downvote") {
        if (type === "question") {
          // Call downvoteQuestion action
          await downvoteQuestion({
            questionId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasdownVoted,
            hasupVoted,
            path: pathname,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {};

  return (
    <div className="flex-center gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center min-w-[18px] p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center min-w-[18px] p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="save"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
