import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NewRoomDiv from '~/components/hello/NewRoomDiv';
import RoomCreated from '~/components/hello/RoomCreated';
import RoomDiv from '~/components/hello/RoomDiv';
import UsernameDiv from '~/components/hello/UserNameDiv';
import { LoadingPage } from '~/components/loading';

const Hello = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { query } = router;
  const [roomName, setRoomName] = useState('');

  const moveToNextScreen = () => {
    user?.publicMetadata.room ? router.push('/dash') : setComponent('RoomDiv');
  };
  const [component, setComponent] = useState(
    user?.publicMetadata.room ? 'RoomDiv' : 'UsernameDiv'
  );
  const [shared, setShared] = useState(null);

  useEffect(() => {
    if (
      user?.publicMetadata.room &&
      user?.publicMetadata.username &&
      component !== 'RoomCreated'
    ) {
      router.push('/dash');
    }
    if (query?.inv && component !== 'RoomDiv') {
      setRoomName(query.inv as string);
    }
  }, [user, component, query?.inv]);

  if (!isLoaded) return <LoadingPage />;
  return (
    <div className=" flex w-full grow flex-col items-center ">
      <div className=" flex w-full grow flex-col items-center gap-3 lg:max-w-[768px]">
        <img
          src="https://notsattamedia.pages.dev/landing/waves.svg"
          className="absolute -left-20 top-[10vh] z-[1] h-[75vh] max-w-none opacity-10 lg:left-0 lg:h-auto lg:w-full"
        />

        {component === 'UsernameDiv' && (
          <UsernameDiv nextScreen={moveToNextScreen} />
        )}
        {component === 'RoomDiv' && (
          <RoomDiv
            roomState={{ roomName, setRoomName }}
            setScreen={setComponent}
          />
        )}
        {component === 'NewRoomDiv' && (
          <NewRoomDiv setScreen={setComponent} setShared={setShared} />
        )}
        {component === 'RoomCreated' && (
          <RoomCreated setScreen={setComponent} roomResponse={shared} />
        )}
      </div>
    </div>
  );
};

export default Hello;
