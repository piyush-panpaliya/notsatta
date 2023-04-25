import { SignedOut } from "@clerk/nextjs/";
import { SignInButton } from "../components/signin";

export default function Home() {
  
  return (
    <div  className="grow flex flex-col justify-between items-center relative w-screen py-4 sm:py-8">
      <img src="media/waves.svg" className="absolute top-3 h-[75vh] w-[150vw] sm:w-[110vw] z-[-1] opacity-30 "/>
      <div className="flex flex-col gap-2 items-center mt-12 -mb-[20vh]">
        <p className="text-3xl sm:text-5xl "><s>Bet</s> Vote on teams  </p>
        <p className="text-3xl sm:text-5xl ">and <b>WIN</b> nothing! </p>
      </ div>
      <img src="media/teams.svg" className="w-[180vw] sm:w-[85vw]"/>
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