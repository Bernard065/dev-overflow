"use client";

import { toast } from "@/hooks/use-toast";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { saveQuestion } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import { VotesProps } from "@/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
  const router = useRouter();

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  const handleVote = async (action: string) => {
    try {
      if (!userId)
        return toast({
          title: "Please sign in to vote",
          description: "You need to sign in to perform this question",
        });

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
        } else if (type === "answer") {
          // Call upvoteAnswer action
          await upvoteAnswer({
            answerId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasdownVoted,
            hasupVoted,
            path: pathname,
          });
        }

        return toast({
          title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
          variant: !hasupVoted ? "default" : "destructive",
          style: {
            backgroundColor: !hasupVoted ? "#4CAF50" : "#F44336", // Green for upvote, red for removal
            color: "#FFFFFF", // White text
            borderRadius: "4px",
            padding: "16px",
          },
          className: "!font-semibold !text-sm",
        });
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
        } else if (type === "answer") {
          // Call downvoteAnswer action
          await downvoteAnswer({
            answerId: JSON.parse(itemId),
            userId: JSON.parse(userId),
            hasdownVoted,
            hasupVoted,
            path: pathname,
          });
        }

        return toast({
          title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
          variant: !hasdownVoted ? "default" : "destructive",
          style: {
            backgroundColor: !hasupVoted ? "#4CAF50" : "#F44336", // Green for upvote, red for removal
            color: "#FFFFFF", // White text
            borderRadius: "4px",
            padding: "16px",
          },
          className: "!font-semibold !text-sm",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    await saveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });

    toast({
      title: `Question ${!hasSaved ? "Saved in" : "Remover from"} your collection`,
      variant: !hasSaved ? "default" : "destructive",
      style: {
        backgroundColor: !hasupVoted ? "#4CAF50" : "#F44336", // Green for upvote, red for removal
        color: "#FFFFFF", // White text
        borderRadius: "4px",
        padding: "16px",
      },
      className: "!font-semibold !text-sm",
    });
  };

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
