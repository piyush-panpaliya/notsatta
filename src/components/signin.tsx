import { useClerk } from '@clerk/nextjs/app-beta/client';

export const SignInButton = () => {
  const { openSignIn } = useClerk();

  return (
    <button
      onClick={() =>
        openSignIn({
          appearance: {
            variables: {
              colorPrimary: '#E24A8D',
            },
          },
          afterSignUpUrl: '/hello',
          afterSignInUrl: '/dash',
        })
      }
      className="text-md mt-[6vh] flex  w-[80vw] items-center justify-center gap-3 bg-white px-6 py-3 font-gilroy font-bold  text-black sm:py-6 sm:text-3xl lg:w-auto lg:py-2.5 lg:text-2xl"
    >
      <svg
        className="h-6 sm:h-10 lg:h-6"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.7631 21.6668C38.7631 20.3379 38.6438 19.0602 38.4223 17.8335H20.772V25.0828H30.8579C30.4235 27.4253 29.1031 29.4102 27.1183 30.739V35.4413H33.1749C36.7186 32.1787 38.7631 27.3742 38.7631 21.6668Z"
          fill="#4285F4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7716 39.9813C25.8316 39.9813 30.0738 38.3031 33.1745 35.4409L27.1179 30.7387C25.4397 31.8631 23.2931 32.5276 20.7716 32.5276C15.8905 32.5276 11.759 29.2309 10.2853 24.8013H4.02417V29.6568C7.10787 35.7816 13.4457 39.9813 20.7716 39.9813Z"
          fill="#34A853"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.2857 24.8015C9.91088 23.6771 9.69792 22.4759 9.69792 21.2408C9.69792 20.0056 9.91088 18.8045 10.2857 17.68V12.8245H4.02458C2.75532 15.3545 2.03125 18.2167 2.03125 21.2408C2.03125 24.2648 2.75532 27.1271 4.02458 29.6571L10.2857 24.8015Z"
          fill="#FBBC05"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7716 9.9537C23.5231 9.9537 25.9934 10.8993 27.9357 12.7563L33.3108 7.38111C30.0653 4.35704 25.8231 2.5 20.7716 2.5C13.4457 2.5 7.10787 6.69963 4.02417 12.8244L10.2853 17.68C11.759 13.2504 15.8905 9.9537 20.7716 9.9537Z"
          fill="#EA4335"
        />
      </svg>
      <p>Continue with google</p>
    </button>
  );
};
