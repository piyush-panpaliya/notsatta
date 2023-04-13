import { SignedOut } from "@clerk/nextjs/app-beta";
import { SignInButton } from "../_components/signin";

export default async function Home() {
  return (
  <div className="my-auto flex flex-grow flex-col items-center relative ">
      <img src="waves.svg" className="absolute top-3 sm:top-0 h-[65vh] sm:h-[75vh] w-[150vw] sm:w-[110vw] z-[-1] opacity-50 "/>
      <p className="text-2xl -mb-[15vh] mt-8 sm:mt-16 sm:text-4xl">alpha beta gamma</p>
      <img src="teams.svg" className=" z-10 w-[150vw] sm:w-[85vw] top-5"/>
      <div className="flex flex-col items-start text-center">
        <SignedOut>
            <SignInButton/>
        </SignedOut>  
        <p className="text-md sm:text-2xl opacity-50 mt-[3vh] w-auto sm:w-full">"JEE se bada satta kuch nhi"</p>
        <p className="text-md sm:text-2xl opacity-50 w-auto sm:w-full">-aristotle</p>
      </div>
  </div>
  );
}