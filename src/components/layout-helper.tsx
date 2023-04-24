import React, { Suspense } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";

import { SignInButton } from "./signin";
import Link from "next/link";

const TopRightNav = ({ slug }: { slug: string | undefined }) => {
  const {user}=useUser()
  return (
    <>
      {user?.publicMetadata.username ? <p>{user?.publicMetadata.username as string}</p>:null}
      <div className="flexh-12 w-12 items-center">
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

export const LayoutHelper = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug?: string;
}) => {
  const {userId}=useAuth()
  return (
    <div className="flex h-screen w-screen flex-col items-center gap-4 pt-2 sm:pt-[40px] overflow-hidden">
      {/* Header */}
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-12  ">
        <Link href={userId?'/dash':'/'} className="text-2xl sm:text-5xl">~Satta</Link>
        <div className="flex items-center gap-5 sm:gap-8">
          <SignedIn>
              <TopRightNav slug={slug} />
          </SignedIn>
          <svg className="h-5 sm:h-8" viewBox="0 0 52 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2H50" stroke="white" strokeWidth="3.49326" strokeLinecap="round"/>
<path d="M2 37.0001H50" stroke="white" strokeWidth="3.49326" strokeLinecap="round"/>
<path d="M9.99951 19.5001H49.9995" stroke="white" strokeWidth="3.49326" strokeLinecap="round"/>
</svg>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};
