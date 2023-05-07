import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { api, getBaseUrl } from '~/utils/api';
import type { Cmatch, Match, Team, Vote } from '@prisma/client';
import { useAuth } from '@clerk/clerk-react';
import Link from 'next/link';
import Head from 'next/head';
import { LoadingPage, LoadingSpinner } from '~/components/loading';
import { getColor } from '~/utils/colors';
import { getMatchType } from '~/utils/cricket';

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
      className="flex w-1/2 items-center   justify-between px-4 py-4 text-white  sm:px-6 "
    >
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_413_264" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.7168 0.615723H7.7168L12.0205 7.00039L7.71721 13.3845H12.7172L17.0181 7.00408H17.023L17.0205 7.00039L17.0234 6.99609H17.0176L12.7168 0.615723Z"
          />
        </mask>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.7168 0.615723H7.7168L12.0205 7.00039L7.71721 13.3845H12.7172L17.0181 7.00408H17.023L17.0205 7.00039L17.0234 6.99609H17.0176L12.7168 0.615723Z"
          fill="white"
        />
        <path
          d="M7.7168 0.615723V0.215723H6.96478L7.38512 0.839301L7.7168 0.615723ZM12.7168 0.615723L13.0485 0.392144L12.9296 0.215723H12.7168V0.615723ZM12.0205 7.00039L12.3522 7.22397L12.5029 7.00039L12.3522 6.77681L12.0205 7.00039ZM7.71721 13.3845L7.38552 13.1609L6.96518 13.7845H7.71721V13.3845ZM12.7172 13.3845V13.7845H12.93L13.0489 13.608L12.7172 13.3845ZM17.0181 7.00408V6.60408H16.8053L16.6864 6.7805L17.0181 7.00408ZM17.023 7.00408V7.40408H17.775L17.3547 6.78052L17.023 7.00408ZM17.0205 7.00039L16.6888 6.77683L16.5382 7.00039L16.6888 7.22395L17.0205 7.00039ZM17.0234 6.99609L17.3551 7.21965L17.7754 6.59609H17.0234V6.99609ZM17.0176 6.99609L16.686 7.21967L16.8049 7.39609H17.0176V6.99609ZM7.7168 1.01572H12.7168V0.215723H7.7168V1.01572ZM12.3522 6.77681L8.04848 0.392144L7.38512 0.839301L11.6889 7.22397L12.3522 6.77681ZM11.6889 6.77681L7.38552 13.1609L8.04889 13.608L12.3522 7.22397L11.6889 6.77681ZM7.71721 13.7845H12.7172V12.9845H7.71721V13.7845ZM13.0489 13.608L17.3497 7.22766L16.6864 6.7805L12.3855 13.1609L13.0489 13.608ZM17.023 6.60408H17.0181V7.40408H17.023V6.60408ZM16.6888 7.22395L16.6913 7.22764L17.3547 6.78052L17.3522 6.77683L16.6888 7.22395ZM17.3522 7.22395L17.3551 7.21965L16.6917 6.77253L16.6888 6.77683L17.3522 7.22395ZM17.0234 6.59609H17.0176V7.39609H17.0234V6.59609ZM12.3851 0.839301L16.686 7.21967L17.3493 6.77252L13.0485 0.392144L12.3851 0.839301Z"
          fill="#0D0D0D"
          mask="url(#path-1-inside-1_413_264)"
        />
        <mask id="path-3-inside-2_413_264" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5 0.615723H0L4.30374 7.00039L0.000408173 13.3845H5.00041L9.30126 7.00408H9.30623L9.30374 7.00039L9.30664 6.99609H9.30085L5 0.615723Z"
          />
        </mask>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 0.615723H0L4.30374 7.00039L0.000408173 13.3845H5.00041L9.30126 7.00408H9.30623L9.30374 7.00039L9.30664 6.99609H9.30085L5 0.615723Z"
          fill="white"
        />
        <path
          d="M0 0.615723V0.215723H-0.75202L-0.331682 0.839301L0 0.615723ZM5 0.615723L5.33168 0.392144L5.21276 0.215723H5V0.615723ZM4.30374 7.00039L4.63543 7.22397L4.78613 7.00039L4.63543 6.77681L4.30374 7.00039ZM0.000408173 13.3845L-0.331274 13.1609L-0.751612 13.7845H0.000408173V13.3845ZM5.00041 13.3845V13.7845H5.21317L5.33209 13.608L5.00041 13.3845ZM9.30126 7.00408V6.60408H9.0885L8.96957 6.7805L9.30126 7.00408ZM9.30623 7.00408V7.40408H10.0582L9.63793 6.78052L9.30623 7.00408ZM9.30374 7.00039L8.97205 6.77683L8.82137 7.00039L8.97205 7.22395L9.30374 7.00039ZM9.30664 6.99609L9.63834 7.21965L10.0586 6.59609H9.30664V6.99609ZM9.30085 6.99609L8.96917 7.21967L9.08809 7.39609H9.30085V6.99609ZM0 1.01572H5V0.215723H0V1.01572ZM4.63543 6.77681L0.331682 0.392144L-0.331682 0.839301L3.97206 7.22397L4.63543 6.77681ZM3.97206 6.77681L-0.331274 13.1609L0.33209 13.608L4.63543 7.22397L3.97206 6.77681ZM0.000408173 13.7845H5.00041V12.9845H0.000408173V13.7845ZM5.33209 13.608L9.63294 7.22766L8.96957 6.7805L4.66873 13.1609L5.33209 13.608ZM9.30623 6.60408H9.30126V7.40408H9.30623V6.60408ZM8.97205 7.22395L8.97454 7.22764L9.63793 6.78052L9.63544 6.77683L8.97205 7.22395ZM9.63544 7.22395L9.63834 7.21965L8.97495 6.77253L8.97205 6.77683L9.63544 7.22395ZM9.30664 6.59609H9.30085V7.39609H9.30664V6.59609ZM4.66832 0.839301L8.96917 7.21967L9.63253 6.77252L5.33168 0.392144L4.66832 0.839301Z"
          fill="#0D0D0D"
          mask="url(#path-3-inside-2_413_264)"
        />
      </svg>
      <p>{team.shortName}</p>
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_413_272" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.2832 0.615723H10.2832L5.97946 7.00039L10.2828 13.3845H5.28279L0.981948 7.00408H0.976971L0.979459 7.00039L0.976562 6.99609H0.982356L5.2832 0.615723Z"
          />
        </mask>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.2832 0.615723H10.2832L5.97946 7.00039L10.2828 13.3845H5.28279L0.981948 7.00408H0.976971L0.979459 7.00039L0.976562 6.99609H0.982356L5.2832 0.615723Z"
          fill="white"
        />
        <path
          d="M10.2832 0.615723V0.215723H11.0352L10.6149 0.839301L10.2832 0.615723ZM5.2832 0.615723L4.95152 0.392144L5.07044 0.215723H5.2832V0.615723ZM5.97946 7.00039L5.64778 7.22397L5.49707 7.00039L5.64778 6.77681L5.97946 7.00039ZM10.2828 13.3845L10.6145 13.1609L11.0348 13.7845H10.2828V13.3845ZM5.28279 13.3845V13.7845H5.07003L4.95111 13.608L5.28279 13.3845ZM0.981948 7.00408V6.60408H1.19471L1.31363 6.7805L0.981948 7.00408ZM0.976971 7.00408V7.40408H0.225006L0.645275 6.78052L0.976971 7.00408ZM0.979459 7.00039L1.31115 6.77683L1.46183 7.00039L1.31115 7.22395L0.979459 7.00039ZM0.976562 6.99609L0.644868 7.21965L0.224595 6.59609H0.976562V6.99609ZM0.982356 6.99609L1.31404 7.21967L1.19512 7.39609H0.982356V6.99609ZM10.2832 1.01572H5.2832V0.215723H10.2832V1.01572ZM5.64778 6.77681L9.95152 0.392144L10.6149 0.839301L6.31114 7.22397L5.64778 6.77681ZM6.31114 6.77681L10.6145 13.1609L9.95111 13.608L5.64778 7.22397L6.31114 6.77681ZM10.2828 13.7845H5.28279V12.9845H10.2828V13.7845ZM4.95111 13.608L0.650267 7.22766L1.31363 6.7805L5.61448 13.1609L4.95111 13.608ZM0.976971 6.60408H0.981948V7.40408H0.976971V6.60408ZM1.31115 7.22395L1.30867 7.22764L0.645275 6.78052L0.647763 6.77683L1.31115 7.22395ZM0.647764 7.22395L0.644868 7.21965L1.30826 6.77253L1.31115 6.77683L0.647764 7.22395ZM0.976562 6.59609H0.982356V7.39609H0.976562V6.59609ZM5.61488 0.839301L1.31404 7.21967L0.650675 6.77252L4.95152 0.392144L5.61488 0.839301Z"
          fill="#0D0D0D"
          mask="url(#path-1-inside-1_413_272)"
        />
        <mask id="path-3-inside-2_413_272" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 0.615723H18L13.6963 7.00039L17.9996 13.3845H12.9996L8.69874 7.00408H8.69377L8.69626 7.00039L8.69336 6.99609H8.69915L13 0.615723Z"
          />
        </mask>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13 0.615723H18L13.6963 7.00039L17.9996 13.3845H12.9996L8.69874 7.00408H8.69377L8.69626 7.00039L8.69336 6.99609H8.69915L13 0.615723Z"
          fill="white"
        />
        <path
          d="M18 0.615723V0.215723H18.752L18.3317 0.839301L18 0.615723ZM13 0.615723L12.6683 0.392144L12.7872 0.215723H13V0.615723ZM13.6963 7.00039L13.3646 7.22397L13.2139 7.00039L13.3646 6.77681L13.6963 7.00039ZM17.9996 13.3845L18.3313 13.1609L18.7516 13.7845H17.9996V13.3845ZM12.9996 13.3845V13.7845H12.7868L12.6679 13.608L12.9996 13.3845ZM8.69874 7.00408V6.60408H8.9115L9.03043 6.7805L8.69874 7.00408ZM8.69377 7.00408V7.40408H7.9418L8.36207 6.78052L8.69377 7.00408ZM8.69626 7.00039L9.02795 6.77683L9.17863 7.00039L9.02795 7.22395L8.69626 7.00039ZM8.69336 6.99609L8.36166 7.21965L7.94139 6.59609H8.69336V6.99609ZM8.69915 6.99609L9.03083 7.21967L8.91191 7.39609H8.69915V6.99609ZM18 1.01572H13V0.215723H18V1.01572ZM13.3646 6.77681L17.6683 0.392144L18.3317 0.839301L14.0279 7.22397L13.3646 6.77681ZM14.0279 6.77681L18.3313 13.1609L17.6679 13.608L13.3646 7.22397L14.0279 6.77681ZM17.9996 13.7845H12.9996V12.9845H17.9996V13.7845ZM12.6679 13.608L8.36706 7.22766L9.03043 6.7805L13.3313 13.1609L12.6679 13.608ZM8.69377 6.60408H8.69874V7.40408H8.69377V6.60408ZM9.02795 7.22395L9.02546 7.22764L8.36207 6.78052L8.36456 6.77683L9.02795 7.22395ZM8.36456 7.22395L8.36166 7.21965L9.02505 6.77253L9.02795 6.77683L8.36456 7.22395ZM8.69336 6.59609H8.69915V7.39609H8.69336V6.59609ZM13.3317 0.839301L9.03083 7.21967L8.36747 6.77252L12.6683 0.392144L13.3317 0.839301Z"
          fill="#0D0D0D"
          mask="url(#path-3-inside-2_413_272)"
        />
      </svg>
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
            background: getColor(cmatch.match.teams[1]?.id),
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
  const pollMatch = async () => {
    if (!cmatch) return;
    const response = await fetch('/api/getMatch', {
      body: JSON.stringify({ id: cmatch?.match.link }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const ma = (await response.json()) as getMatchType;
    if (
      (ma.status == 'FINISHED' && cmatch.status !== 'FINISHED') ||
      (ma.status == 'LIVE' && cmatch.status === 'OPEN')
    ) {
      fetch(`${getBaseUrl()}/api/cron/matchLive`, {
        body: JSON.stringify(cmatch?.match),
        method: 'POST',
      });
    }
    setFmatch(ma);
  };

  useEffect(() => {
    if (!cmatch?.match) return;
    pollMatch();
    const id = setInterval(async () => {
      await pollMatch();
      refetch();
    }, 2 * 60 * 1000);
    return () => clearInterval(id);
  }, [cmatch]);

  if (!matchId) return null;
  if (cmatchLoading) return <LoadingPage />;
  return (
    <div className="flex w-full grow flex-col items-center justify-between">
      <img
        src="https://notsattamedia.pages.dev/landing/waves.svg"
        className="absolute left-[-10px] top-[15vh] z-[-1]  w-[200vw] max-w-none opacity-5 sm:w-[150vw] lg:left-0  lg:h-auto lg:w-[110vw]"
      />
      <div className="flex w-full grow flex-col items-center justify-between gap-[3vh] py-8 font-gilroy font-semibold lg:max-w-[768px]">
        <Head>
          <title>
            {cmatch
              ? `${cmatch?.match.teams[0]?.shortName} v/s ${cmatch?.match.teams[1]?.shortName}`
              : '~notsatta'}
          </title>
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
                strokeWidth="2"
                strokeLinecap="square"
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
            {fetchedMatch && fetchedMatch.status === 'LIVE' && (
              <div className="flex w-full flex-col gap-2 ">
                <p className="w-full text-xl  sm:text-2xl">score</p>
                <p className="w-full border-2 border-white py-2 text-center text-xl font-normal  tracking-wider sm:py-4 sm:text-2xl">
                  {fetchedMatch ? (
                    // (fetchedMatch.score[0].currently_batting ||
                    // fetchedMatch.score[1].currently_batting) &&
                    fetchedMatch.score[0].currently_batting ? (
                      `${fetchedMatch.score[0].short_name}  ${fetchedMatch.score[0].score}`
                    ) : (
                      `${fetchedMatch.score[1].short_name}  ${fetchedMatch.score[1].score}`
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
              <div
                className="flex  w-full items-center justify-between px-4 py-2 sm:px-8 sm:py-4"
                style={{ background: getColor(cmatch.winnerId as number) }}
              >
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_413_264" fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.7168 0.615723H7.7168L12.0205 7.00039L7.71721 13.3845H12.7172L17.0181 7.00408H17.023L17.0205 7.00039L17.0234 6.99609H17.0176L12.7168 0.615723Z"
                    />
                  </mask>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7168 0.615723H7.7168L12.0205 7.00039L7.71721 13.3845H12.7172L17.0181 7.00408H17.023L17.0205 7.00039L17.0234 6.99609H17.0176L12.7168 0.615723Z"
                    fill="white"
                  />
                  <path
                    d="M7.7168 0.615723V0.215723H6.96478L7.38512 0.839301L7.7168 0.615723ZM12.7168 0.615723L13.0485 0.392144L12.9296 0.215723H12.7168V0.615723ZM12.0205 7.00039L12.3522 7.22397L12.5029 7.00039L12.3522 6.77681L12.0205 7.00039ZM7.71721 13.3845L7.38552 13.1609L6.96518 13.7845H7.71721V13.3845ZM12.7172 13.3845V13.7845H12.93L13.0489 13.608L12.7172 13.3845ZM17.0181 7.00408V6.60408H16.8053L16.6864 6.7805L17.0181 7.00408ZM17.023 7.00408V7.40408H17.775L17.3547 6.78052L17.023 7.00408ZM17.0205 7.00039L16.6888 6.77683L16.5382 7.00039L16.6888 7.22395L17.0205 7.00039ZM17.0234 6.99609L17.3551 7.21965L17.7754 6.59609H17.0234V6.99609ZM17.0176 6.99609L16.686 7.21967L16.8049 7.39609H17.0176V6.99609ZM7.7168 1.01572H12.7168V0.215723H7.7168V1.01572ZM12.3522 6.77681L8.04848 0.392144L7.38512 0.839301L11.6889 7.22397L12.3522 6.77681ZM11.6889 6.77681L7.38552 13.1609L8.04889 13.608L12.3522 7.22397L11.6889 6.77681ZM7.71721 13.7845H12.7172V12.9845H7.71721V13.7845ZM13.0489 13.608L17.3497 7.22766L16.6864 6.7805L12.3855 13.1609L13.0489 13.608ZM17.023 6.60408H17.0181V7.40408H17.023V6.60408ZM16.6888 7.22395L16.6913 7.22764L17.3547 6.78052L17.3522 6.77683L16.6888 7.22395ZM17.3522 7.22395L17.3551 7.21965L16.6917 6.77253L16.6888 6.77683L17.3522 7.22395ZM17.0234 6.59609H17.0176V7.39609H17.0234V6.59609ZM12.3851 0.839301L16.686 7.21967L17.3493 6.77252L13.0485 0.392144L12.3851 0.839301Z"
                    fill="#0D0D0D"
                    mask="url(#path-1-inside-1_413_264)"
                  />
                  <mask id="path-3-inside-2_413_264" fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 0.615723H0L4.30374 7.00039L0.000408173 13.3845H5.00041L9.30126 7.00408H9.30623L9.30374 7.00039L9.30664 6.99609H9.30085L5 0.615723Z"
                    />
                  </mask>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 0.615723H0L4.30374 7.00039L0.000408173 13.3845H5.00041L9.30126 7.00408H9.30623L9.30374 7.00039L9.30664 6.99609H9.30085L5 0.615723Z"
                    fill="white"
                  />
                  <path
                    d="M0 0.615723V0.215723H-0.75202L-0.331682 0.839301L0 0.615723ZM5 0.615723L5.33168 0.392144L5.21276 0.215723H5V0.615723ZM4.30374 7.00039L4.63543 7.22397L4.78613 7.00039L4.63543 6.77681L4.30374 7.00039ZM0.000408173 13.3845L-0.331274 13.1609L-0.751612 13.7845H0.000408173V13.3845ZM5.00041 13.3845V13.7845H5.21317L5.33209 13.608L5.00041 13.3845ZM9.30126 7.00408V6.60408H9.0885L8.96957 6.7805L9.30126 7.00408ZM9.30623 7.00408V7.40408H10.0582L9.63793 6.78052L9.30623 7.00408ZM9.30374 7.00039L8.97205 6.77683L8.82137 7.00039L8.97205 7.22395L9.30374 7.00039ZM9.30664 6.99609L9.63834 7.21965L10.0586 6.59609H9.30664V6.99609ZM9.30085 6.99609L8.96917 7.21967L9.08809 7.39609H9.30085V6.99609ZM0 1.01572H5V0.215723H0V1.01572ZM4.63543 6.77681L0.331682 0.392144L-0.331682 0.839301L3.97206 7.22397L4.63543 6.77681ZM3.97206 6.77681L-0.331274 13.1609L0.33209 13.608L4.63543 7.22397L3.97206 6.77681ZM0.000408173 13.7845H5.00041V12.9845H0.000408173V13.7845ZM5.33209 13.608L9.63294 7.22766L8.96957 6.7805L4.66873 13.1609L5.33209 13.608ZM9.30623 6.60408H9.30126V7.40408H9.30623V6.60408ZM8.97205 7.22395L8.97454 7.22764L9.63793 6.78052L9.63544 6.77683L8.97205 7.22395ZM9.63544 7.22395L9.63834 7.21965L8.97495 6.77253L8.97205 6.77683L9.63544 7.22395ZM9.30664 6.59609H9.30085V7.39609H9.30664V6.59609ZM4.66832 0.839301L8.96917 7.21967L9.63253 6.77252L5.33168 0.392144L4.66832 0.839301Z"
                    fill="#0D0D0D"
                    mask="url(#path-3-inside-2_413_264)"
                  />
                </svg>
                <p className=" text-center text-xl  text-white  sm:text-3xl">
                  {`You ${
                    cmatch?.votes
                      .filter((vote) => vote.teamId === cmatch?.winnerId)
                      .some((vote) => vote.userId === userId)
                      ? 'won'
                      : 'lost'
                  }`}
                </p>
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_413_272" fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.2832 0.615723H10.2832L5.97946 7.00039L10.2828 13.3845H5.28279L0.981948 7.00408H0.976971L0.979459 7.00039L0.976562 6.99609H0.982356L5.2832 0.615723Z"
                    />
                  </mask>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.2832 0.615723H10.2832L5.97946 7.00039L10.2828 13.3845H5.28279L0.981948 7.00408H0.976971L0.979459 7.00039L0.976562 6.99609H0.982356L5.2832 0.615723Z"
                    fill="white"
                  />
                  <path
                    d="M10.2832 0.615723V0.215723H11.0352L10.6149 0.839301L10.2832 0.615723ZM5.2832 0.615723L4.95152 0.392144L5.07044 0.215723H5.2832V0.615723ZM5.97946 7.00039L5.64778 7.22397L5.49707 7.00039L5.64778 6.77681L5.97946 7.00039ZM10.2828 13.3845L10.6145 13.1609L11.0348 13.7845H10.2828V13.3845ZM5.28279 13.3845V13.7845H5.07003L4.95111 13.608L5.28279 13.3845ZM0.981948 7.00408V6.60408H1.19471L1.31363 6.7805L0.981948 7.00408ZM0.976971 7.00408V7.40408H0.225006L0.645275 6.78052L0.976971 7.00408ZM0.979459 7.00039L1.31115 6.77683L1.46183 7.00039L1.31115 7.22395L0.979459 7.00039ZM0.976562 6.99609L0.644868 7.21965L0.224595 6.59609H0.976562V6.99609ZM0.982356 6.99609L1.31404 7.21967L1.19512 7.39609H0.982356V6.99609ZM10.2832 1.01572H5.2832V0.215723H10.2832V1.01572ZM5.64778 6.77681L9.95152 0.392144L10.6149 0.839301L6.31114 7.22397L5.64778 6.77681ZM6.31114 6.77681L10.6145 13.1609L9.95111 13.608L5.64778 7.22397L6.31114 6.77681ZM10.2828 13.7845H5.28279V12.9845H10.2828V13.7845ZM4.95111 13.608L0.650267 7.22766L1.31363 6.7805L5.61448 13.1609L4.95111 13.608ZM0.976971 6.60408H0.981948V7.40408H0.976971V6.60408ZM1.31115 7.22395L1.30867 7.22764L0.645275 6.78052L0.647763 6.77683L1.31115 7.22395ZM0.647764 7.22395L0.644868 7.21965L1.30826 6.77253L1.31115 6.77683L0.647764 7.22395ZM0.976562 6.59609H0.982356V7.39609H0.976562V6.59609ZM5.61488 0.839301L1.31404 7.21967L0.650675 6.77252L4.95152 0.392144L5.61488 0.839301Z"
                    fill="#0D0D0D"
                    mask="url(#path-1-inside-1_413_272)"
                  />
                  <mask id="path-3-inside-2_413_272" fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13 0.615723H18L13.6963 7.00039L17.9996 13.3845H12.9996L8.69874 7.00408H8.69377L8.69626 7.00039L8.69336 6.99609H8.69915L13 0.615723Z"
                    />
                  </mask>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13 0.615723H18L13.6963 7.00039L17.9996 13.3845H12.9996L8.69874 7.00408H8.69377L8.69626 7.00039L8.69336 6.99609H8.69915L13 0.615723Z"
                    fill="white"
                  />
                  <path
                    d="M18 0.615723V0.215723H18.752L18.3317 0.839301L18 0.615723ZM13 0.615723L12.6683 0.392144L12.7872 0.215723H13V0.615723ZM13.6963 7.00039L13.3646 7.22397L13.2139 7.00039L13.3646 6.77681L13.6963 7.00039ZM17.9996 13.3845L18.3313 13.1609L18.7516 13.7845H17.9996V13.3845ZM12.9996 13.3845V13.7845H12.7868L12.6679 13.608L12.9996 13.3845ZM8.69874 7.00408V6.60408H8.9115L9.03043 6.7805L8.69874 7.00408ZM8.69377 7.00408V7.40408H7.9418L8.36207 6.78052L8.69377 7.00408ZM8.69626 7.00039L9.02795 6.77683L9.17863 7.00039L9.02795 7.22395L8.69626 7.00039ZM8.69336 6.99609L8.36166 7.21965L7.94139 6.59609H8.69336V6.99609ZM8.69915 6.99609L9.03083 7.21967L8.91191 7.39609H8.69915V6.99609ZM18 1.01572H13V0.215723H18V1.01572ZM13.3646 6.77681L17.6683 0.392144L18.3317 0.839301L14.0279 7.22397L13.3646 6.77681ZM14.0279 6.77681L18.3313 13.1609L17.6679 13.608L13.3646 7.22397L14.0279 6.77681ZM17.9996 13.7845H12.9996V12.9845H17.9996V13.7845ZM12.6679 13.608L8.36706 7.22766L9.03043 6.7805L13.3313 13.1609L12.6679 13.608ZM8.69377 6.60408H8.69874V7.40408H8.69377V6.60408ZM9.02795 7.22395L9.02546 7.22764L8.36207 6.78052L8.36456 6.77683L9.02795 7.22395ZM8.36456 7.22395L8.36166 7.21965L9.02505 6.77253L9.02795 6.77683L8.36456 7.22395ZM8.69336 6.59609H8.69915V7.39609H8.69336V6.59609ZM13.3317 0.839301L9.03083 7.21967L8.36747 6.77252L12.6683 0.392144L13.3317 0.839301Z"
                    fill="#0D0D0D"
                    mask="url(#path-3-inside-2_413_272)"
                  />
                </svg>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Match;
