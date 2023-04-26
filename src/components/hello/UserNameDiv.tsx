import { useUser } from '@clerk/nextjs';
import { Button, InputField } from '@cred/neopop-web/lib/components';
import React, { useEffect, useState } from 'react';
import { api } from '~/utils/api';

const UsernameDiv = ({ nextScreen }: { nextScreen: any }) => {
  const [username, setUsername] = useState('');
  const { user } = useUser();
  const {
    mutateAsync: updateUsername,
    isLoading,
    error,
  } = api.user.username.useMutation({
    onSuccess: nextScreen,
  });

  useEffect(() => {
    if (user?.publicMetadata.username) {
      nextScreen();
    }
  }, [user]);
  return (
    <div className="mt-10 flex h-full w-full grow flex-col items-center justify-between pb-[20vh] sm:mt-[70px]">
      <div className=" flex w-full  flex-col gap-6  sm:gap-14 ">
        <div className="flex w-full flex-col gap-2">
          <p className="text-2xl sm:text-3xl">create your username</p>
          <InputField
            type="text"
            label=" "
            placeholder="enter your username"
            id="text_field"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            style={{
              border: '1px solid white',
              padding: '0.75rem 1rem 0.75rem 1rem',
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
            maxLength={15}
            hasError={!!error}
            isDisabled={isLoading}
            errorMessage={error ? error.shape?.message : ''}
            scrollIntoView={false}
          />
        </div>
      </div>
      <Button
        kind="elevated"
        colorMode="light"
        size="big"
        onClick={() => {
          updateUsername({ username });
        }}
        fullWidth
        showArrow
        spacingConfig={{ padding: '1rem 0 1rem 0' }}
        disabled={isLoading || username.length < 2 || username.length > 15}
      >
        <p className="text-2xl sm:text-4xl">continue</p>
      </Button>
    </div>
  );
};

export default UsernameDiv;
