import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api, getBaseUrl } from '~/utils/api';
import type { Cmatch, Match, Team, Vote } from '@prisma/client';
import { useAuth } from '@clerk/clerk-react';
import Link from 'next/link';
import Head from 'next/head';
import { LoadingPage, LoadingSpinner } from '~/components/loading';
import { getColor } from '~/utils/colors';

type CmatchFull =
  | (Cmatch & {
      match: Match & {
        teams: Team[];
      };
      votes: Vote[];
      winner: Team | null;
    })
  | null
  | undefined;

const TeamDiv = ({ team }: { team: Team }) => {
  return (
    <div className="flex w-1/4 flex-col items-center gap-16">
      <img src={team.flag} className="w-full" />
    </div>
  );
};

const PutVote = ({ refetch, cmatch, vote }: any) => {
  const router = useRouter();
  const { id: matchId } = router.query;
  const { mutateAsync, isLoading } = api.match.vote.putVote.useMutation({
    onSuccess: refetch,
  });
  if (!matchId) return null;
  return cmatch.match.teams.map((team: Team) => (
    <button
      style={{ background: isLoading ? '#3D3D3D' : getColor(team.id) }}
      key={team.id}
      disabled={isLoading}
      onClick={() => {
        mutateAsync({ inpMatchId: matchId as string, voteTeam: team.id });
      }}
      className={`w-1/2  py-4 text-white `}
    >
      {team.shortName}
    </button>
  ));
};

const VoteBar = ({ cmatch }: { cmatch: CmatchFull }) => {
  const { data: room, isLoading: roomLoading } = api.room.get.useQuery();
  if (roomLoading || !cmatch) return <LoadingSpinner />;
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex h-[4vh] w-full items-center justify-between bg-[#8A8A8A]">
        <div
          className="h-full "
          style={{
            // @ts-expect-error
            background: getColor(cmatch.match.teams[0]?.id),
            width: `${
              (cmatch.votes.filter(
                (vote) => vote.teamId === cmatch.match.teams[0]?.id
              ).length *
                100) /
              // @ts-expect-error
              room?.users.length
            }%`,
          }}
        ></div>
        <div
          className="h-full bg-[#005AA0]"
          style={{
            // @ts-expect-error
            background: getColor(cmatch.match.teams[0]?.id),
            width: `${
              (cmatch.votes.filter(
                (vote) => vote.teamId === cmatch.match.teams[1]?.id
              ).length *
                100) /
              // @ts-expect-error
              room?.users.length
            }%`,
          }}
        ></div>
      </div>
      <div className="flex w-full items-center justify-between px-2 text-lg tracking-widest">
        <p>
          {`
                  ${
                    cmatch.votes.filter(
                      (vote) => vote.teamId === cmatch.match.teams[0]?.id
                    ).length
                  }/${room?.users.length}
                `}
        </p>
        <p className="text-[#8A8A8A]">votes</p>
        <p>
          {`
                  ${
                    cmatch.votes.filter(
                      (vote) => vote.teamId === cmatch.match.teams[1]?.id
                    ).length
                  }/${room?.users.length}
                `}
        </p>
      </div>
    </div>
  );
};

const Match = () => {
  const router = useRouter();
  const { id: matchId } = router.query;
  const { userId } = useAuth();
  const [fetchedMatch, setFmatch] = useState<any>();
  const {
    data: cmatch,
    refetch,
    isLoading: cmatchLoading,
  } = api.match.getcmatch.useQuery({
    inpMatchId: matchId as string,
  });
  useEffect(() => {
    if (!cmatch?.match) return;
    const id = setInterval(async () => {
      const response = await fetch(cmatch?.match.link);
      const ma = (await response.json()) as any;
      if (
        ma['match_status'] == 'post' ||
        (ma['match_status'] == 'live' && cmatch.status === 'OPEN')
      ) {
        fetch(`${getBaseUrl()}/api/cron/matchLive`, {
          body: JSON.stringify(cmatch?.match),
          method: 'POST',
        });
      }
      setFmatch(ma);
    }, 5000);
    return () => clearInterval(id);
  }, [cmatch]);
  if (!matchId) return null;
  if (cmatchLoading) return <LoadingPage />;
  return (
    <div className="flex w-full grow flex-col items-center justify-between gap-[3vh] py-8 font-gilroy font-semibold lg:max-w-[768px]">
      <Head>
        <title>{`${cmatch?.match.teams[0]?.shortName} v/s ${cmatch?.match.teams[1]?.shortName}`}</title>
      </Head>
      <div className="flex w-full items-center justify-between px-4 py-2">
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
        {cmatch?.match && (
          <p className=" text-xl  sm:text-2xl">
            {`${
              cmatch?.match.startTime.getDate() === new Date().getDate()
                ? 'Today'
                : `${cmatch?.match.startTime.getDate()}
                /${cmatch?.match.startTime.getMonth() + 1}`
            },
            ${
              cmatch?.match.startTime.getHours() % 12 || 12
            }:${cmatch?.match.startTime.getMinutes()}`}
          </p>
        )}
      </div>

      {cmatch?.match.teams && (
        <div className=" flex w-full grow flex-col items-center gap-[5rem]">
          <div className=" mt-20 flex w-full flex-col items-center justify-between gap-[5rem] ">
            <div className=" flex w-full items-center justify-between">
              {/* @ts-expect-error */}
              <TeamDiv team={cmatch.match.teams[0]} />
              <p className=" text-3xl  sm:text-4xl">v/s</p>
              {/* @ts-expect-error */}
              <TeamDiv team={cmatch.match.teams[1]} />
            </div>
            <div className=" flex w-full items-center justify-between ">
              <p className="w-[25%] text-center text-3xl  sm:text-5xl">
                {cmatch.match.teams[0] && cmatch.match.teams[0].shortName}
              </p>
              <p className="text-xl text-[#8A8A8A]">{`T20 ${cmatch.match.number}/74`}</p>
              <p className="w-[25%] text-center text-3xl  sm:text-5xl">
                {cmatch.match.teams[1] && cmatch.match.teams[1].shortName}
              </p>
            </div>
          </div>
          {/* voting info bar*/}
          <VoteBar cmatch={cmatch} />
          {/* more info of match */}
          {fetchedMatch && fetchedMatch.match_status === 'live' && (
            <div className="flex w-full flex-col gap-2 ">
              <p className="w-full text-xl  sm:text-2xl">score</p>
              <p className="w-full border-2 border-white py-2 text-center text-xl  sm:py-4 sm:text-2xl">
                {fetchedMatch ? (
                  fetchedMatch.score_strip[0].currently_batting ? (
                    `${fetchedMatch.score_strip[0].short_name}  ${fetchedMatch.score_strip[0].score}`
                  ) : (
                    `${fetchedMatch.score_strip[1].short_name}  ${fetchedMatch.score_strip[1].score}`
                  )
                ) : (
                  <LoadingSpinner size={24} />
                )}
              </p>
            </div>
          )}
        </div>
      )}
      <div className="flex w-full items-center justify-between gap-3">
        {cmatch && cmatch.status !== 'FINISHED' ? (
          // check if i Have not voted and show vote button if not voted
          !cmatch.votes.some((vote) => vote.userId === userId) ? (
            cmatch.status === 'OPEN' && (
              <PutVote refetch={refetch} cmatch={cmatch} />
            )
          ) : (
            <p
              style={{
                background: getColor(
                  cmatch?.match.teams.find(
                    (team) =>
                      cmatch?.votes.find((vote) => vote.userId === userId)
                        ?.teamId === team.id
                  )?.id as number
                ),
              }}
              className="w-full py-2 text-center text-xl  text-white sm:py-4 sm:text-3xl"
            >{`you voted for ${
              cmatch?.match.teams.find(
                (team) =>
                  cmatch?.votes.find((vote) => vote.userId === userId)
                    ?.teamId === team.id
              )?.shortName
            }`}</p>
          )
        ) : (
          cmatch?.votes.some((vote) => vote.userId === userId) && (
            <p
              style={{ background: getColor(cmatch.winnerId as number) }}
              className="w-full  py-2 text-center text-xl  text-white sm:py-4 sm:text-3xl"
            >
              {`You ${
                cmatch?.votes
                  .filter((vote) => vote.teamId === cmatch?.winnerId)
                  .some((vote) => vote.userId === userId)
                  ? 'won'
                  : 'lost'
              }`}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Match;
