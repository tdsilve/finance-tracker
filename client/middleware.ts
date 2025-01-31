import { NextResponse, NextRequest } from "next/server";

const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("user")?.value;
    const isAuthenticated = !!token;
    const { pathname, origin } = req.nextUrl;
    const isPublicRoute = publicRoutes.find((route) => pathname.startsWith(route));

    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", origin));
    } 
  
    return NextResponse.next();

}

 export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
       '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)'
    ],
   }