import { Button, InputField, Toggle } from '@cred/neopop-web/lib/components';
import { colorGuide } from '@cred/neopop-web/lib/primitives';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { api } from '~/utils/api';

const NewRoomDiv = ({
  setScreen,
  setShared,
}: {
  setScreen: any;
  setShared: any;
}) => {
  const [roomName, setRoomName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const {
    mutateAsync: creatRoom,
    error,
    isLoading,
  } = api.room.create.useMutation({
    onSuccess: (data: any) => {
      console.log(data);
      setShared(data);
      setScreen('RoomCreated');
    },
  });
  const handleChange = (event: any) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div className="mt-10 flex h-full w-full grow flex-col items-center justify-between pb-[20vh] sm:mt-[10vh]">
      <div className=" flex w-full  flex-col gap-6  sm:gap-10 ">
        <span onClick={() => setScreen('RoomDiv')}>
          <svg
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
        </span>
        <p className="text-2xl sm:text-4xl">create new room</p>
        <InputField
          type="text"
          label=" "
          placeholder="enter a new room name"
          id="roomName"
          maxLength={15}
          value={roomName}
          onChange={(e: any) => setRoomName(e.target.value)}
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
          scrollIntoView={false}
          autoFocus={false}
        />
        <div className="flex items-center justify-between">
          <p className="max-w-[75%] text-xl sm:text-2xl">
            Allow members to invite other people
          </p>
          <Toggle
            isChecked={isChecked}
            colorConfig={{
              on: {
                ...colorGuide.lightComponents.toggle.on,
                switchBackground: 'transparent',
                switchBorder: 'white',
              },
              off: {
                ...colorGuide.lightComponents.toggle.off,
                switchBackground: 'transparent',
                switchBorder: '1px white',
              },
            }}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        kind="elevated"
        colorMode="light"
        size="big"
        onClick={() => {
          creatRoom({ roomName });
        }}
        fullWidth
        showArrow
        spacingConfig={{ padding: '1rem 0 1rem 0' }}
        disabled={isLoading || roomName.length < 2}
      >
        <p className="text-2xl sm:text-4xl">continue</p>
      </Button>
    </div>
  );
};

export default NewRoomDiv;
