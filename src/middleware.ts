import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/sign-in*", "/sign-up*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);
  if (userId && request.nextUrl.pathname === "/") {
    const dashUrl = new URL("/dash", request.url)
    return NextResponse.redirect(dashUrl)
  }


  if (!userId) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next()
    }
    // redirect the users to /pages/sign-in/[[...index]].ts
    if (request.nextUrl.pathname === "/hello" && request.nextUrl.searchParams.get("inv")) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signInUrl);
    }

    const signInUrl = new URL("/", request.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: [
    '/',
    '/((?!_next/image|media/|_next/static|favicon.ico|api/cron|api/getMatch|api/clerkWebhook).*)',
  ]
};