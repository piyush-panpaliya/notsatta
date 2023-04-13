// "use client";

import { useClerk } from "@clerk/nextjs/app-beta/client";

import Button from "./common/button";

export const SignInButton = () => {
  // const { openSignIn } = useClerk();

  return (
    // <div></div>
    <button className="bg-white w-[80vw]  text-black font-bold text-md sm:text-3xl py-3 sm:py-8 mt-[6vh] flex items-center gap-3 justify-center">
      <img className="h-6 sm:h-10" src="google.svg "/> 
      <p>Continue with google</p>
    </button>
  );
};
        