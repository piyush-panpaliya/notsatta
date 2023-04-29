import { SignedOut } from '@clerk/nextjs/';
import { SignInButton } from '../components/signin';

import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col items-start text-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <p className="text-md mt-6 w-auto font-gilroy opacity-50 sm:mt-8 sm:w-full sm:text-2xl lg:mt-4">
        "JEE se bada satta kuch nhi"
      </p>
      <p className="text-md w-auto font-gilroy opacity-50 sm:w-full sm:text-2xl">
        -aristotle
      </p>
    </div>
  );
};

export default function Home() {
  return (
    <div className=" z-0 flex w-full grow flex-col items-center justify-between pb-4 pt-16 sm:pb-8 lg:relative lg:overflow-hidden">
      <img
        src="https://notsattamedia.pages.dev/landing/waves.svg"
        className="absolute left-[-10px] top-[15vh] z-[-1]  w-[150vw] max-w-none opacity-30 sm:w-[110vw] lg:left-0  lg:h-auto lg:w-[110vw]"
      />

      <div className=" flex w-full grow flex-col items-center gap-8 lg:-mt-[15rem] lg:flex-row">
        <div className=" flex  flex-col items-center gap-2 font-cirka lg:w-1/2 xl:w-[60%]">
          <p className="text-3xl sm:text-5xl">
            <s>Bet</s> Vote on teams{' '}
          </p>
          <p className="text-3xl sm:text-5xl ">
            and <b>WIN</b> nothing!{' '}
          </p>
          <div className="hidden lg:block">
            <Login />
          </div>
        </div>
        <img
          src="https://notsattamedia.pages.dev/landing/teams.webp"
          className="-mt-[10vh] w-[180vw] sm:w-[85vw] lg:w-1/2 xl:w-[40%]"
        />
      </div>
      <div className="lg:hidden">
        <Login />
      </div>
    </div>
  );
}
