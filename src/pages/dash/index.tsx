import { useUser } from '@clerk/nextjs';
import { Cmatch, Match, Team } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { prisma } from '~/server/db';
import { api } from '~/utils/api';
import Link from 'next/link';

const MatchTab = ({ match }: { match: Cmatch }) => {
  return (
    <Link
      href={`/match/${match.matchId}`}
      className="flex w-full items-center justify-between bg-white px-4 py-4 sm:py-6 "
    >
      {/* @ts-expect-error */}
      <TeamNames teams={match.match.teams} />
      <p>{match.status === 'OPEN' ? 'vote now' : 'live now'}</p>
    </Link>
  );
};

export const TeamNames = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="flex grow items-center justify-between  px-4 sm:px-8">
      <div className="flex items-center gap-2 sm:gap-4 ">
        <img src={teams[0]?.flag} className="h-8 w-8" />
        <p className="w-4">{teams[0]?.shortName}</p>
      </div>
      <p>v/s</p>
      <div className="flex items-center gap-2 sm:gap-4 ">
        <p className="w-4">{teams[1]?.shortName}</p>
        <img src={teams[1]?.flag} className="h-8 w-8" />
      </div>
    </div>
  );
};

const LiveMatch = () => {
  const { data, isLoading } = api.match.getcmatches.useQuery(undefined, {
    // refetchOnWindowFocus: false,
  });
  if (isLoading) return <p>...Loading</p>;
  return (
    <div className="w-[80%] text-black">
      {data && data.map((match) => <MatchTab match={match} />)}
    </div>
  );
};

const ListMatch = ({ match }: { match: Match }) => {
  return (
    <div className="w-[80%] border-b-[1px] border-white py-4 sm:py-6">
      {/* @ts-expect-error */}
      <TeamNames teams={match.teams} />
    </div>
  );
};

const Dash = ({ matches }: { matches: Match[] }) => {
  const { user } = useUser();
  const router = useRouter();
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
    <div className=" relative flex w-full grow flex-col items-center gap-16  pt-[5vh] md:max-w-[768px]">
      <div className=" flex w-full items-center justify-between ">
        <p className="text-xl sm:text-5xl">Room Name</p>
        <p className="text-xl font-bold sm:text-2xl">Ranking</p>
      </div>
      <LiveMatch />
      <div className=" flex w-full flex-col items-center border-[1px] border-white">
        <div className="flex w-full items-center justify-around">
          <p className="w-1/2 border-b-[1px] border-r-0 border-white py-4 text-center text-xl font-bold sm:text-2xl">
            Upcoming Matches
          </p>
          <p className="w-1/2 border-b-[1px] border-l-[1px] border-white py-4 text-center text-xl font-bold sm:text-2xl">
            Past Matches
          </p>
        </div>
        {matches.map((match) => (
          <ListMatch match={match} key={match.id} />
        ))}
      </div>
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
