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
      <div className="flex items-center gap-2 font-gilroy font-semibold">
        <div className="h-2 w-2 rounded-full sm:h-4 sm:w-4">
          {match.status === 'OPEN' ? (
            <svg
              className="w-full"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://w3.org/2000/svg"
            >
              <rect
                x="0.975342"
                y="0.963135"
                width="18.0001"
                height="18.0001"
                rx="9.00006"
                fill="#4FE3A3"
              />
              <rect
                x="5.47632"
                y="5.46313"
                width="9.00006"
                height="9.00006"
                rx="4.50003"
                fill="#06C270"
              />
            </svg>
          ) : (
            <svg
              className="w-full"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://w3.org/2000/svg"
            >
              <rect
                x="0.92627"
                y="0.963135"
                width="18.0001"
                height="18.0001"
                rx="9.00006"
                fill="#FFA0B7"
              />
              <rect
                x="5.42725"
                y="5.46313"
                width="9.00006"
                height="9.00006"
                rx="4.50003"
                fill="#FF426F"
              />
            </svg>
          )}
        </div>
        <p className="text-sm  sm:text-lg">
          {match.status === 'OPEN'
            ? 'vote now'
            : match.status === 'LIVE'
            ? 'live now'
            : 'finished'}
        </p>
      </div>
    </Link>
  );
};

const TeamNames = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="flex grow items-center justify-between px-4  font-cirka font-bold sm:w-full sm:px-8">
      <div className="flex items-center gap-2 sm:flex-col sm:gap-4 ">
        <div className="flex h-8 w-8 items-center justify-center sm:h-12 sm:min-w-[6.5rem] ">
          <img src={teams[0]?.flag} className="h-full" />
        </div>
        <p className="align-center text-lg sm:text-3xl">
          {teams[0]?.shortName}
        </p>
      </div>
      <p className="font-semibold sm:text-xl">v/s</p>
      <div className=" flex items-center gap-2 sm:flex-col-reverse sm:gap-4">
        <p className="align-center text-center text-lg  sm:text-3xl">
          {teams[1]?.shortName}
        </p>
        <div className="align-center flex h-8 w-8 justify-center sm:h-12 sm:min-w-[6.5rem] ">
          <img src={teams[1]?.flag} className=" h-full" />
        </div>
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
      className="flex w-[90%] items-center justify-between gap-[10vw] border-b-2 border-[#8A8A8A] py-4 sm:py-8"
    >
      <div className="flex grow items-center justify-between px-4  sm:w-full sm:px-8">
        <div className="flex w-[40%] items-center gap-2  sm:gap-4 ">
          <div className=" w-6 sm:w-12">
            <img src={teams[0]?.flag} className="h-full" />
          </div>
          <p className=" text-lg font-normal sm:text-5xl">
            {teams[0]?.shortName}
          </p>
        </div>
        <p className="text-sm font-semibold sm:text-3xl">v/s</p>
        <div className="flex  w-[40%] items-center justify-end gap-2  sm:gap-4 ">
          <p className=" text-lg font-normal sm:text-5xl">
            {teams[1]?.shortName}
          </p>
          <div className=" w-6 sm:w-12">
            <img src={teams[1]?.flag} className=" h-full" />
          </div>
        </div>
      </div>
      <p className="text-lg sm:text-4xl">{`${date.getDate()}/${
        date.getMonth() + 1
      }`}</p>
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
    <div className="flex w-full flex-col items-center border-2 border-[#8A8A8A] font-cirka font-semibold">
      <div className="mb-4 flex w-full items-center justify-around">
        <p
          className={`w-1/2 border-b-2 border-r-2 border-[#8A8A8A]   py-4 text-center font-gilroy text-sm font-semibold  hover:cursor-pointer sm:text-2xl ${
            state === 'upcoming' ? 'text-white ' : 'text-[#3D3D3D]'
          }`}
          onClick={() => setState('upcoming')}
        >
          Upcoming Matches
        </p>
        <p
          className={`w-1/2 border-b-2 border-[#8A8A8A]  py-4 text-center font-gilroy text-sm font-semibold  hover:cursor-pointer sm:text-2xl ${
            state === 'past' ? 'text-white ' : 'text-[#3D3D3D]'
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
        <p
          onClick={() => setShow(true)}
          className="min-w-[20px] px-2 py-1 font-gilroy"
        >
          show more
        </p>
      )}
      {show &&
        matchesstate
          .slice(10, matchesstate.length)
          .map((match: any) => <ListMatch match={match} key={match.id} />)}
      {show && (
        <p
          onClick={() => setShow(false)}
          className="min-w-[30px] px-2 py-1 font-gilroy"
        >
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
        <p className="  font-cirka text-2xl font-semibold sm:text-5xl">
          {data?.name}
        </p>
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
          <p className=" font-gilroy text-sm font-semibold sm:text-2xl">
            Leaderboard
          </p>
        </Link>
      </div>
      <LiveMatch />
      <Table matches={matches} />
    </div>
  );
};

export async function getStaticProps() {
  const today = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  today.setUTCHours(23, 0, 0, 0);
  const upMatches = await prisma.match.findMany({
    where: {
      startTime: {
        gt: today,
      },
    },
    include: {
      teams: true,
    },
    orderBy: {
      startTime: 'asc',
    },
  });
  today.setUTCHours(6, 0, 0, 0);
  const paMatches = await prisma.match.findMany({
    where: {
      startTime: {
        lt: today,
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
    revalidate: 3 * 60 * 60,
  };
}

export default Dash;
