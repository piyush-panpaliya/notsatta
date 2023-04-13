import { AuthenticateWithRedirectCallback } from "@clerk/nextjs/app-beta/client";

export default async function Home() {
  return (
    <AuthenticateWithRedirectCallback />
  );
}