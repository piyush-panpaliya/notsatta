import Link from 'next/link';
import React from 'react';
import { api } from '~/utils/api';

const Leaderboard = () => {
  const { data } = api.room.leaderboardGet.useQuery();
  return (
    <div className="flex min-h-full w-full flex-col gap-16">
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
              stroke-width="2"
              stroke-linecap="square"
            />
          </svg>
        </Link>
        <p>Leaderboard</p>
      </div>
      <div className="flex w-full flex-col border-2 border-white px-8 py-4">
        {data?.map((user) => (
          <div className="flex w-full gap-8 border-b-2 border-white px-4 py-2">
            <div className="flex w-full gap-8">
              <img src={user.image} className="h-8 w-8 rounded-full" />
              <p>{user.username}</p>
            </div>
            <p>{user.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
