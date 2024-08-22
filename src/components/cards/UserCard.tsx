import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { UserCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

const UserCard = async ({ user }: UserCardProps) => {
  const topInteractedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone  max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <div className="size-[100px] overflow-hidden rounded-full">
          <Image
            src={user.picture}
            alt="user"
            height={100}
            width={100}
            className="object-cover"
          />
        </div>
        <div className="mt-4 items-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {topInteractedTags && topInteractedTags?.length > 0 ? (
            <div className="flex items-center gap-2">
              {topInteractedTags.map((tag) => (
                <RenderTag key={tag.id} _id={tag.id} title={tag.name} />
              ))}
            </div>
          ) : (
            <Badge className="text-dark500_light500">No tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
