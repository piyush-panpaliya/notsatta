import { SignedOut } from "@clerk/nextjs/";
import { SignInButton } from "../components/signin";

export default function Home() {
  
  return (
    <div  className="grow flex flex-col justify-between items-center relative w-screen py-4 sm:py-12">
      <img src="media/waves.svg" className="absolute top-3 h-[75vh] w-[150vw] sm:w-[110vw] z-[-1] opacity-30 "/>
      <p className="text-2xl -mb-[15vh]  sm:text-4xl ">alpha beta gamma</p>
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