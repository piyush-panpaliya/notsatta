import { useUser } from '@clerk/nextjs';
import { Cmatch, Match, Team } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { prisma } from '~/server/db';
import { api } from '~/utils/api';
import Link from 'next/link';
import { LoadingSpinner } from '~/components/loading';

type PropMatches = { matches: { paMatches: Match[]; upMatches: Match[] } };

const MatchTab = ({ match }: { match: Cmatch }) => {
  return (
    <Link
      href={`/match/${match.matchId}`}
      className="flex w-full items-center justify-between gap-2 bg-white px-4 py-6 sm:w-1/2 sm:flex-col sm:gap-3 sm:py-8 "
    >
      {/* @ts-expect-error */}
      <TeamNames teams={match.match.teams} />
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full bg-${
            match.status === 'OPEN' ? 'green-500' : 'red-500'
          }`}
        />
        <p className="text-sm font-bold sm:text-lg">
          {match.status === 'OPEN' ? 'vote now' : 'live now'}
        </p>
      </div>
    </Link>
  );
};

export const TeamNames = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="flex grow items-center justify-between px-4  sm:w-full sm:px-8">
      <div className="flex items-center gap-2 sm:flex-col sm:gap-4 ">
        <img src={teams[0]?.flag} className=" w-8  sm:w-12" />
        <p className="text-lg font-semibold sm:text-3xl">
          {teams[0]?.shortName}
        </p>
      </div>
      <p className="font-semibold sm:text-xl">v/s</p>
      <div className=" flex gap-2 sm:flex-col-reverse sm:gap-4 ">
        <p className="align-center text-lg font-semibold sm:text-3xl">
          {teams[1]?.shortName}
        </p>
        <img src={teams[1]?.flag} className=" w-8 sm:w-12" />
      </div>
    </div>
  );
};

const LiveMatch = () => {
  const { data, isLoading } = api.match.getcmatches.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <LoadingSpinner size={32} />;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 text-center text-black sm:flex-row sm:gap-8">
      {data && data.map((match) => <MatchTab key={match.id} match={match} />)}
    </div>
  );
};

const ListMatch = ({ match }: { match: Match }) => {
  // @ts-expect-error
  const { teams } = match;
  const date = new Date(match.startTime);
  return (
    <Link
      href={`/match/${match.id}`}
      className="flex w-[90%] items-center justify-between gap-[10vw] border-b-[1px] border-white py-4 sm:py-6"
    >
      <div className="flex grow items-center justify-between px-4  sm:w-full sm:px-8">
        <div className="flex w-[40%] items-center gap-2  sm:gap-4 ">
          <img src={teams[0]?.flag} className=" w-6 sm:w-12" />
          <p className=" text-sm font-normal sm:text-2xl">
            {teams[0]?.shortName}
          </p>
        </div>
        <p className="text-xs font-semibold sm:text-xl">v/s</p>
        <div className="flex  w-[40%] items-center justify-end gap-2  sm:gap-4 ">
          <p className=" text-sm font-normal sm:text-2xl">
            {teams[1]?.shortName}
          </p>
          <img src={teams[1]?.flag} className=" w-6 sm:w-12" />
        </div>
      </div>
      <p>{`${date.getDate()}/${date.getMonth()}`}</p>
    </Link>
  );
};

const Table = ({ matches }: PropMatches) => {
  const [show, setShow] = useState<boolean>(false);
  const [matchesstate, setMatches] = useState<any[]>(matches.upMatches);
  const [state, setState] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    setMatches(state === 'upcoming' ? matches.upMatches : matches.paMatches);
  }, [state]);

  return (
    <div className="flex w-full flex-col items-center border-[1px] border-white">
      <div className="mb-4 flex w-full items-center justify-around">
        <p
          className={`w-1/2 border-b-[1px] border-r-[1px] border-white py-4  text-center text-lg font-bold hover:cursor-pointer  sm:text-2xl ${
            state === 'upcoming' ? 'bg-gray-800 ' : 'bg-black'
          }`}
          onClick={() => setState('upcoming')}
        >
          Upcoming Matches
        </p>
        <p
          className={`w-1/2 border-b-[1px] border-white  py-4  text-center text-lg font-bold hover:cursor-pointer  sm:text-2xl ${
            state === 'past' ? 'bg-gray-800 ' : 'bg-black'
          }`}
          onClick={() => setState('past')}
        >
          Past Matches
        </p>
      </div>
      {matchesstate.slice(0, 10).map((match: any) => (
        <ListMatch match={match} key={match.id} />
      ))}
      {!show && (
        <p onClick={() => setShow(true)} className="min-w-[20px] px-2 py-1">
          show more
        </p>
      )}
      {show &&
        matchesstate
          .slice(10, matchesstate.length)
          .map((match: any) => <ListMatch match={match} key={match.id} />)}
      {show && (
        <p onClick={() => setShow(false)} className="min-w-[30px] px-2 py-1">
          show less
        </p>
      )}
    </div>
  );
};

const Dash = ({ matches }: PropMatches) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { data } = api.room.get.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!isLoaded) return;
    if (!router.query?.nocheck) {
      if (
        user &&
        (!user?.publicMetadata.username || !user?.publicMetadata.room)
      ) {
        console.log(user?.publicMetadata.username, user?.publicMetadata.room);
        router.push('/hello');
      }
    }
    if (router.query?.nocheck === '1') router.replace('/dash');
  }, [user]);

  return (
    <div className=" relative flex w-full grow flex-col items-center gap-12 pt-[1vh] sm:max-w-[768px] sm:gap-16 sm:pt-[5vh]">
      <div className=" flex w-full items-center justify-between ">
        <p className="  text-2xl sm:text-5xl">{data?.name}</p>
        <Link href="/leaderboard" className="flex items-center gap-3 sm:gap-4">
          <svg
            className="w-4 sm:w-8"
            viewBox="0 0 35 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.540527 32.5099V10.5533H10.4711V32.5099H0.540527ZM12.5665 32.5099V0.713867H22.4971V32.5099H12.5665ZM24.5925 32.5099V13.8331H34.5231V32.5099H24.5925Z"
              fill="white"
            />
          </svg>
          <p className=" text-sm font-bold sm:text-2xl">Leaderboard</p>
        </Link>
        {/* <label
              onClick={() => setTheme((prev) => !prev)}
              className="btn-primary drawer-button btn"
            >
              Open drawer
            </label> */}
      </div>
      <LiveMatch />
      <Table matches={matches} />
    </div>
  );
};

export async function getStaticProps() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(1, 0, 0, 0);
  const upMatches = await prisma.match.findMany({
    where: {
      startTime: {
        gte: tomorrow,
      },
    },
    include: {
      teams: true,
    },
    orderBy: {
      startTime: 'asc',
    },
  });
  const today = new Date();
  today.setHours(6, 0, 0, 0);
  const paMatches = await prisma.match.findMany({
    where: {
      startTime: {
        lte: today,
      },
    },
    include: {
      teams: true,
    },
    orderBy: {
      startTime: 'desc',
    },
  });
  const matchAll = {
    upMatches: upMatches.map((match) => {
      return { ...match, startTime: match.startTime.toJSON() };
    }),
    paMatches: paMatches.map((match) => {
      return { ...match, startTime: match.startTime.toJSON() };
    }),
  };
  return {
    props: {
      matches: matchAll,
    },
    revalidate: 10 * 60 * 60,
  };
}

export default Dash;
