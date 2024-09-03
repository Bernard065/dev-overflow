import ProfileForm from "@/components/forms/ProfileForm"
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <div className="flex w-full sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      </div>

      <ProfileForm clerkId={userId} user={JSON.stringify(mongoUser)} />
    </>
  );
};

export default Page;
