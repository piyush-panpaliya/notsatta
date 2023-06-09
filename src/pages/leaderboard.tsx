import Link from 'next/link';
import React from 'react';
import { LoadingPage } from '~/components/loading';
import { api } from '~/utils/api';

const Leaderboard = () => {
  const { data, isLoading } = api.room.leaderboardGet.useQuery();
  if (isLoading) return <LoadingPage />;
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-between ">
      <img
        src="https://notsattamedia.pages.dev/landing/waves.svg"
        className="absolute left-[-10px] top-[15vh] z-[-1]  w-[200vw] max-w-none opacity-5 sm:w-[150vw] lg:left-0  lg:h-auto lg:w-[110vw]"
      />
      <div className="flex min-h-full w-full flex-col gap-8 pt-8 font-gilroy font-medium lg:w-[768px]">
        <div className="flex w-full items-center justify-between">
          <Link href="/dash">
            <svg
              className="hover:cursor-pointer"
              width="44"
              height="19"
              viewBox="0 0 44 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.5001 9.5H0M0 9.5C4 9.5 9.50011 7 9.50011 1M0 9.5C4 9.5 9.50011 12.0002 9.50011 17.5002"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </Link>
          <p>Leaderboard</p>
        </div>
        <div className=" flex w-full flex-col gap-y-4 border-2 border-[#3D3D3D] bg-bg pb-4 text-center">
          <div className="flex w-full items-center justify-around  border-b-2 border-[#3D3D3D]  text-lg font-normal sm:text-xl">
            <p className="w-12 py-3 sm:w-16">#</p>
            <p className="grow border-l-2 border-r-2 border-[#3D3D3D] py-3">
              member
            </p>
            <p className="w-12 py-3 sm:w-16">pts</p>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-8 text-xl sm:text-2xl">
            {data?.map((user, n) => (
              <div key={n} className="flex w-full items-center py-2">
                <p className="w-12 sm:w-16">{n + 1}</p>
                <div className="justify-left flex grow items-center gap-4  pl-4 sm:gap-8">
                  <img src={user.image} className="h-8 w-8 " />
                  <p className="">{user.username}</p>
                </div>
                <p className="w-12 sm:w-16">{user.points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
