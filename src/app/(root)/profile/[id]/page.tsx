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
import Stats from "@/components/shared/Stats";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswerTab from "@/components/shared/AnswerTab";
import { BadgeCounts } from "@/types";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ params, searchParams }: Props) => {
  const { id } = params;

  const { userId } = auth();

  const userInfo = await getUserInfo({ userId: id });

  console.log("The User Info is: ", userInfo);

  const defaultBadgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const badgeCounts = userInfo?.badgeCounts || defaultBadgeCounts;

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <div className="size-36 overflow-hidden rounded-full">
            <Image
              src={userInfo?.user.picture}
              alt="profile"
              width={144}
              height={144}
              className="object-contain"
            />
          </div>

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo?.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo?.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo?.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  title="Portfolio"
                  href={userInfo?.user.portfolioWebsite}
                />
              )}
              {userInfo?.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo?.user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo?.user.joinedAt)}
              />
            </div>

            {userInfo?.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo?.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-md:mt-3 max-sm:mb-5 max-sm:w-full">
          <SignedIn>
            {userId === userInfo?.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        totalQuestions={userInfo?.totalQuestions || 0}
        totalAnswers={userInfo?.totalAnswers || 0}
        badgeCounts={badgeCounts}
        reputation={userInfo?.user.reputation || 0}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-questions" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-questions" className="tab">
              Top Questions
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-questions">
            <QuestionTab
              userId={userInfo?.user._id}
              clerkId={userId}
              searchParams={searchParams}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab
              userId={userInfo?.user._id}
              clerkId={userId}
              searchParams={searchParams}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
