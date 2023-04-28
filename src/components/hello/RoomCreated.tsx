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
          onClick={() => {
            navigator.clipboard.writeText(
              `https://${document.location.host}/hello?inv=${roomResponse.roomInv}`
            );
          }}
          className="text-md flex w-full   items-center justify-center gap-3 border-2 border-white bg-black px-6 py-3 font-normal text-white sm:py-6 sm:text-3xl lg:w-auto lg:py-2.5 lg:text-2xl"
        >
          <svg
            className="w-8"
            viewBox="0 0 21 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.352 3.50163L10.8361 1.10871C9.78115 0.772844 8.65409 1.35785 8.32162 2.41383L3.69769 17.1003C3.36831 18.1465 3.94295 19.2628 4.98578 19.6025L12.5712 22.0741C13.6331 22.4201 14.7727 21.8293 15.1019 20.762L19.6564 5.99689C19.9799 4.94813 19.3978 3.83459 18.352 3.50163Z"
              fill="#1FC87F"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7345 20.4634C13.2633 20.6285 13.8256 20.3323 13.9885 19.8028L17.9976 6.76663C18.1897 6.14207 17.8468 5.47864 17.2262 5.27416L6.05525 1.59345C5.4144 1.38229 4.72549 1.74085 4.53078 2.38689L0.542797 15.6186C0.384545 16.1437 0.678689 16.6983 1.20215 16.8617L12.7345 20.4634Z"
              fill="#0D0D0D"
            />
            <path
              d="M6.58573 2.57421L2.54155 15.8554C2.3527 16.4756 2.69058 17.1336 3.30463 17.3415L11.7718 20.2087C12.4107 20.4251 13.1024 20.0724 13.3026 19.4282L17.4515 6.07534C17.6462 5.4487 17.3015 4.78187 16.6776 4.57842L8.10575 1.78291C7.46689 1.57456 6.78147 1.93138 6.58573 2.57421Z"
              fill="white"
              stroke="#0D0D0D"
              stroke-width="0.4"
              stroke-Linejoin="round"
            />
          </svg>

          <p>copy link</p>
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
