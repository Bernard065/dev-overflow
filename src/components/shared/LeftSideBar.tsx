"use client";

import { sidebarLinks } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <div key={link.route}>
              <Link
                href={link.route}
                className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${isActive ? "base-bold" : "base-medium"} max-md:hidden`}
                >
                  {link.label}
                </p>
              </Link>
            </div>
          );
        })}
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="btn-secondary small-medium min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="assets/icons/account.svg"
                  alt="login"
                  width={20}
                  height={20}
                  className="invert-colors md:hidden
                "
                />
                <span className="primary-text-gradient max-md:hidden">Sign In</span>
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="btn-tertiary light-border-2 small-medium text-dark400_light900 min-h-[42px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                  src="assets/icons/account.svg"
                  alt="sign-up"
                  width={20}
                  height={20}
                  className="invert-colors md:hidden
                "
                />
                <span className="max-md:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSideBar;
