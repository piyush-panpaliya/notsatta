import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api, getBaseUrl } from '~/utils/api';
import type { Cmatch, Match, Team, Vote } from '@prisma/client';
import { useAuth } from '@clerk/clerk-react';
import { getMatch } from '~/utils/cricket';
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
      key={team.id}
      disabled={isLoading}
      onClick={() => {
        mutateAsync({ inpMatchId: matchId as string, voteTeam: team.id });
      }}
      className={`w-1/2  py-4 text-black bg-${
        isLoading ? 'gray-400' : 'white'
      }`}
    >
      {team.shortName}
    </button>
  ));
};

const VoteBar = ({ cmatch }: { cmatch: CmatchFull }) => {
  const { data: room, isLoading: roomLoading } = api.room.get.useQuery();
  if (roomLoading || !cmatch) return <p>...Loading</p>;
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex h-[4vh] w-full items-center justify-between bg-slate-600">
        <div
          className="h-full bg-[#F9CD05]"
          style={{
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
  if (cmatchLoading) return <p>...Loading</p>;
  return (
    <div className="flex w-full grow flex-col items-center justify-between gap-[5vh] py-8 lg:max-w-[768px]">
      <div className="flex w-full items-center justify-between px-4 py-2">
        <p onClick={() => router.push('/dash')}>back</p>
        {cmatch?.match && (
          <p className="text-xl sm:text-2xl">
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
          <div className=" mt-20 flex w-full flex-col items-center justify-between gap-[5rem]">
            <div className=" flex w-full items-center justify-between">
              {/* @ts-expect-error */}
              <TeamDiv team={cmatch.match.teams[0]} />
              <p className=" text-3xl font-semibold sm:text-4xl">v/s</p>
              {/* @ts-expect-error */}
              <TeamDiv team={cmatch.match.teams[1]} />
            </div>
            <div className=" flex w-full items-center justify-between">
              <p className="w-[25%] text-center text-3xl font-semibold sm:text-5xl">
                {cmatch.match.teams[0] && cmatch.match.teams[0].shortName}
              </p>
              <p className="text-xl text-[#8A8A8A]">{`T20 ${cmatch.match.number}/74`}</p>
              <p className="w-[25%] text-center text-3xl font-semibold sm:text-5xl">
                {cmatch.match.teams[1] && cmatch.match.teams[1].shortName}
              </p>
            </div>
          </div>
          {/* voting info bar*/}
          <VoteBar cmatch={cmatch} />
          {/* more info of match */}
          {fetchedMatch && fetchedMatch.match_status === 'live' && (
            <div className="flex w-full flex-col gap-2 ">
              <p className="w-full text-xl font-semibold sm:text-2xl">score</p>
              <p className="w-full border-2 border-white py-2 text-center text-xl font-semibold sm:py-4 sm:text-2xl">
                {fetchedMatch
                  ? fetchedMatch.score_strip[0].currently_batting
                    ? `${fetchedMatch.score_strip[0].short_name}  ${fetchedMatch.score_strip[0].score}`
                    : `${fetchedMatch.score_strip[1].short_name}  ${fetchedMatch.score_strip[1].score}`
                  : '...Loading'}
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
            <p className="w-full bg-white py-2 text-center text-xl font-semibold text-black sm:py-4 sm:text-3xl">{`you voted for ${
              cmatch?.match.teams.find(
                (team) =>
                  cmatch?.votes.find((vote) => vote.userId === userId)
                    ?.teamId === team.id
              )?.shortName
            }`}</p>
          )
        ) : (
          <p className="w-full bg-white py-2 text-center text-xl font-semibold text-black sm:py-4 sm:text-3xl">
            {`You ${
              cmatch?.votes
                .filter((vote) => vote.userId === userId)
                .some((vote) => vote.teamId === cmatch?.winnerId)
                ? 'won'
                : 'lost'
            }`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Match;
