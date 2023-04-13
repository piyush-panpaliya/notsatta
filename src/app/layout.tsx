import "./globals.css";

export const metadata = {
  title: "NOTsatta",
  description:
    "a fun app definitely not a betting app",
};

import React from "react";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head/>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body
          className="bg-landing overscroll-none"
        >
          <div className="flex h-screen w-full grow flex-col pt-2 sm:pt-[40px]">{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}