import { NextResponse, NextRequest } from "next/server";

const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/recover-password",
  "/reset-password",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sessionToken")?.value;
  const isAuthenticated = !!token;
  const { pathname, origin } = req.nextUrl;

  const isPublicRoute = publicRoutes.find((route) =>
    pathname.startsWith(route),
  );

  if (pathname.startsWith("/reset-password")) {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", origin));
    }
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", origin));
  } else if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
