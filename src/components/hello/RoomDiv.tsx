import { useUser } from '@clerk/nextjs';
import { Button, InputField } from '@cred/neopop-web/lib/components';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { api } from '~/utils/api';

const RoomDiv = ({
  setScreen,
  roomState,
}: {
  setScreen: any;
  roomState: any;
}) => {
  const router = useRouter();
  const {
    mutateAsync: joinRoom,
    isLoading,
    error,
  } = api.room.join.useMutation({
    onSuccess: () => router.push({ pathname: '/dash', query: { nocheck: 1 } }),
  });
  // const { mutateAsync } = api.room.create.useMutation();
  return (
    <div className="mt-10 flex h-full w-full grow flex-col items-center justify-between pb-[20vh] sm:mt-[10vh]">
      <div className=" flex w-full  flex-col gap-6  sm:gap-10 ">
        <Button
          variant="secondary"
          kind="flat"
          size="big"
          onClick={() => {
            setScreen('NewRoomDiv');
          }}
          fullWidth
          spacingConfig={{ padding: '1rem 0 1rem 0' }}
        >
          <div className="flex gap-4">
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.1352 44.5706C21.5002 23.7921 20.9811 23.2763 0.202637 22.6381C20.9811 22.0031 21.497 21.484 22.1352 0.705536C22.7701 21.484 23.2892 21.9999 44.0677 22.6381C23.2892 23.2763 22.7734 23.7858 22.1352 44.5706Z"
                fill="black"
              />
            </svg>

            <p className=" text-2xl  sm:text-4xl">create new room</p>
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.1352 44.5706C21.5002 23.7921 20.9811 23.2763 0.202637 22.6381C20.9811 22.0031 21.497 21.484 22.1352 0.705536C22.7701 21.484 23.2892 21.9999 44.0677 22.6381C23.2892 23.2763 22.7734 23.7858 22.1352 44.5706Z"
                fill="black"
              />
            </svg>
          </div>
        </Button>
        <div className="relative flex w-full items-center py-5">
          <div className="grow border-t border-gray-400"></div>
          <span className="mx-4 shrink text-lg text-gray-400">or</span>
          <div className="grow border-t border-gray-400"></div>
        </div>
        <div className="w-full">
          <InputField
            type="text"
            label=" "
            placeholder="enter a pre-existing room invite"
            id="roomName"
            autoFocus={false}
            value={roomState.roomName}
            onChange={(e: any) => roomState.setRoomName(e.target.value)}
            style={{
              border: '1px solid white',
              padding: '1rem 1rem 1rem 1rem',
            }}
            textStyle={{
              label: { fontSize: 15, fontType: 'heading', fontWeight: 400 },
              input: { fontSize: 30, fontType: 'heading', fontWeight: 400 },
            }}
            colorConfig={{
              labelColor: 'white',
              errorColor: '#EE4D37',
              placeholderColor: '#3D3D3D',
            }}
            hasError={!!error}
            isDisabled={isLoading}
            errorMessage={error ? error.shape?.message : ''}
          />
          <p className="mt-2 text-[#8A8A8A]">
            enter the room token you recieved to enter the room
          </p>
        </div>
      </div>
      <Button
        kind="elevated"
        colorMode="light"
        size="big"
        onClick={() => {
          joinRoom({ slug: roomState.roomName });
        }}
        fullWidth
        showArrow
        spacingConfig={{ padding: '1rem 0 1rem 0' }}
        disabled={isLoading || roomState.roomName.length < 2}
      >
        <p className="text-2xl sm:text-4xl">continue</p>
      </Button>
    </div>
  );
};

export default RoomDiv;
