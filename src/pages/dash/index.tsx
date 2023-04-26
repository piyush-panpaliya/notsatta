import { useUser } from '@clerk/nextjs';
import { Cmatch, Match, Team } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { prisma } from '~/server/db';
import { api } from '~/utils/api';
import Link from 'next/link';

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
        <img src={teams[0]?.flag} className="h-8 w-8 sm:h-12 sm:w-12" />
        <p className="text-lg font-semibold sm:text-3xl">
          {teams[0]?.shortName}
        </p>
      </div>
      <p className="font-semibold sm:text-xl">v/s</p>
      <div className=" flex gap-2 sm:flex-col-reverse sm:gap-4 ">
        <p className="align-center text-lg font-semibold sm:text-3xl">
          {teams[1]?.shortName}
        </p>
        <img src={teams[1]?.flag} className="h-8 w-8 sm:h-12 sm:w-12" />
      </div>
    </div>
  );
};

const LiveMatch = () => {
  const { data, isLoading } = api.match.getcmatches.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <p>...Loading</p>;
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 text-center text-black sm:flex-row sm:gap-8">
      {data && data.map((match) => <MatchTab match={match} />)}
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
          <img src={teams[0]?.flag} className="h-6 w-6 sm:h-12 sm:w-12" />
          <p className=" text-sm font-normal sm:text-2xl">
            {teams[0]?.shortName}
          </p>
        </div>
        <p className="text-xs font-semibold sm:text-xl">v/s</p>
        <div className="flex  w-[40%] items-center justify-end gap-2  sm:gap-4 ">
          <p className=" text-sm font-normal sm:text-2xl">
            {teams[1]?.shortName}
          </p>
          <img src={teams[1]?.flag} className="h-6 w-6 sm:h-12 sm:w-12" />
        </div>
      </div>
      <p>{`${date.getDate()}/${date.getMonth()}`}</p>
    </Link>
  );
};

const Table = ({ matches }: { matches: Match[] }) => {
  const [show, setShow] = useState<boolean>(false);
  const [matchesstate, setMatches] = useState<any[]>(matches);
  const [state, setState] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingMatches = matches.filter((match) => {
    return new Date(match.startTime) > new Date();
  });
  const pastMatches = matches.filter(
    (match) => new Date(match.startTime) < new Date()
  );

  useEffect(() => {
    setMatches(state === 'upcoming' ? upcomingMatches : pastMatches);
  }, [state]);

  return (
    <div className="flex w-full flex-col items-center border-[1px] border-white">
      <div className="mb-4 flex w-full items-center justify-around">
        <p
          className="w-1/2 border-b-[1px] border-r-0 border-white py-4 text-center text-lg font-bold sm:text-2xl"
          onClick={() => setState('upcoming')}
        >
          Upcoming Matches
        </p>
        <p
          className="w-1/2 border-b-[1px] border-l-[1px] border-white py-4 text-center text-lg font-bold sm:text-2xl"
          onClick={() => setState('past')}
        >
          Past Matches
        </p>
      </div>
      {matches.slice(0, 10).map((match: any) => (
        <ListMatch match={match} key={match.id} />
      ))}
      {!show && (
        <p onClick={() => setShow(true)} className="min-w-[20px] px-2 py-1">
          show more
        </p>
      )}
      {show &&
        matches
          .slice(10, matches.length)
          .map((match: any) => <ListMatch match={match} key={match.id} />)}
      {show && (
        <p onClick={() => setShow(false)} className="min-w-[30px] px-2 py-1">
          show less
        </p>
      )}
    </div>
  );
};

const Dash = ({ matches }: { matches: Match[] }) => {
  const { user } = useUser();
  const router = useRouter();
  const { data } = api.room.get.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
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
    <div className=" relative flex w-full grow flex-col items-center gap-16  pt-[5vh] sm:max-w-[768px]">
      <div className=" flex w-full items-center justify-between ">
        <p className="text-xl sm:text-5xl">{data?.name}</p>
        <p className="text-xl font-bold sm:text-2xl">Leaderboard</p>
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
  const matches = await prisma.match.findMany({
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
  return {
    props: {
      matches: matches.map((match) => {
        return { ...match, startTime: match.startTime.toJSON() };
      }),
    },
    revalidate: 10 * 60 * 60,
  };
}

export default Dash;
