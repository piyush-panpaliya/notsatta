import React, { Suspense } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs/app-beta";

import { SignInButton } from "./signin";

const TopRightNav = async ({ slug }: { slug: string | undefined }) => {
  return (
    <>
      <div className="flex h-12 w-12 items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            layout: {
              logoPlacement: "none",
            },
            elements: {
              userButtonAvatarBox: "h-8 w-8 sm:h-12 sm:w-12",
            },
          }}
        />
      </div>
    </>
  );
};

export const LayoutHelper = async ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug?: string;
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-12  ">
        <p className="text-2xl sm:text-5xl">~Satta</p>
        <div className="flex items-center gap-4">
          <SignedOut>
            {/* <SignInButton /> */}
            <svg className="h-5 sm:h-8" viewBox="0 0 52 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2H50" stroke="white" stroke-width="3.49326" stroke-linecap="round"/>
<path d="M2 37.0001H50" stroke="white" stroke-width="3.49326" stroke-linecap="round"/>
<path d="M9.99951 19.5001H49.9995" stroke="white" stroke-width="3.49326" stroke-linecap="round"/>
</svg>

          </SignedOut>
          <SignedIn>
            {/* TODO: Make this fallback a skeleton with a profile picture since we know that much by now */}
            <Suspense fallback={<div />}>
              {/* @ts-expect-error Server Component */}
              <TopRightNav slug={slug} />
            </Suspense>
          </SignedIn>
        </div>
      </div>

      {/* Content */}
      {children}
    </>
  );
};
