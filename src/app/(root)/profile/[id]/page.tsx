import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJoinedDate } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { userId } = auth();

  const result = await getUserInfo({ userId: id });

  console.log("result", result);

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <div className="size-36 overflow-hidden rounded-full">
            <Image
              src={result?.user.picture}
              alt="profile"
              width={144}
              height={144}
              className="object-contain"
            />
          </div>

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {result?.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{result?.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {result?.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  title="Portfolio"
                  href={result?.user.portfolioWebsite}
                />
              )}
              {result?.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={result?.user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(result?.user.joinedAt)}
              />
            </div>

            {result?.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {result?.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-md:mt-3 max-sm:mb-5 max-sm:w-full">
          <SignedIn>
            {userId === result?.user.clerkId && (
              <Link href="profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      Stats
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-questions" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-questions">Top Questions</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-questions">POSTS</TabsContent>
          <TabsContent value="answers">ANSWERS</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
