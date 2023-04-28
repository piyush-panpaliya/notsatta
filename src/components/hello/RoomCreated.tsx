import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const RoomCreated = ({
  setScreen,
  roomResponse,
}: {
  setScreen: any;
  roomResponse: any;
}) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (roomResponse) return;
    if (!user?.publicMetadata.username) {
      return setScreen('UsernameDiv');
    }
    if (!user?.publicMetadata.room) {
      setScreen('RoomDiv');
    }
  }, [user]);
  return (
    <div className="mt-10 flex h-full w-full grow flex-col items-center justify-between pb-[20vh] sm:mt-[10vh]">
      <div className=" flex w-full  flex-col gap-6  sm:gap-10 ">
        <p className="text-2xl sm:text-4xl">Room created successfully</p>
        <p className="text-3xl font-bold sm:text-5xl">
          {roomResponse && roomResponse.name}
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-4 sm:gap-8 ">
        <button
          onClick={() => navigator.clipboard.writeText(roomResponse.roomInv)}
          className="text-md flex w-full   items-center justify-center gap-3 border-2 border-white bg-black px-6 py-3 font-normal text-white sm:py-6 sm:text-3xl lg:w-auto lg:py-2.5 lg:text-2xl"
        >
          copy link
        </button>
        <button
          onClick={() =>
            router.push({ pathname: '/dash', query: { nocheck: 1 } })
          }
          className="text-md  flex  w-full items-center justify-center gap-3 bg-white px-6 py-3 font-bold text-black sm:py-6 sm:text-3xl lg:w-auto lg:py-2.5 lg:text-2xl "
        >
          continue
        </button>
      </div>
    </div>
  );
};

export default RoomCreated;
