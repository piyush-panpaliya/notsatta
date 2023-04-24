import { useClerk } from "@clerk/nextjs/app-beta/client";

export const SignInButton = () => {
  const { openSignIn } = useClerk();

  return (
    <button 
      onClick={() => 
        openSignIn({
          appearance: {
            variables: {
              colorPrimary: "#E24A8D",
            },
          },
          afterSignUpUrl: "/hello",
          afterSignInUrl: "/dash",
        })
      }
      className="bg-white w-[80vw]  text-black font-bold text-md sm:text-3xl py-3 sm:py-6 mt-[6vh] flex items-center gap-3 justify-center">
      <img className="h-6 sm:h-10" src="media/google.svg "/> 
      <p>Continue with google</p>
    </button>
  );
};
        