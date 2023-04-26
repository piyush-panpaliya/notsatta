import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NewRoomDiv from '~/components/hello/NewRoomDiv';
import RoomDiv from '~/components/hello/RoomDiv';
import UsernameDiv from '~/components/hello/UserNameDiv';

const Hello = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const moveToNextScreen = () => {
    user?.publicMetadata.room ? router.push('/dash') : setComponent('RoomDiv');
  };
  const [component, setComponent] = useState(
    user?.publicMetadata.room ? 'RoomDiv' : 'UsernameDiv'
  );

  useEffect(() => {
    if (user?.publicMetadata.room && user?.publicMetadata.username) {
      router.push('/dash');
    }
  }, [user]);

  if (!isLoaded) return <p>loading...</p>;
  return (
    <div className=" flex w-full grow flex-col items-center ">
      <div className=" flex w-full grow flex-col items-center gap-3 lg:max-w-[768px]">
        <img
          src="media/waves.svg"
          className="absolute -left-20 top-[10vh] z-[-1] h-[75vh] max-w-none opacity-10 lg:left-0 lg:h-auto lg:w-full"
        />

        {component === 'UsernameDiv' && (
          <UsernameDiv nextScreen={moveToNextScreen} />
        )}
        {component === 'RoomDiv' && <RoomDiv setScreen={setComponent} />}
        {component === 'NewRoomDiv' && <NewRoomDiv setScreen={setComponent} />}
      </div>
    </div>
  );
};

export default Hello;
