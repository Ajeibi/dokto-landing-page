import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("dokto-token");

  // if (req.nextUrl.pathname.startsWith("/_next")) {
  //   return NextResponse.next();
  // }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth/signup", req.url));
  }

  if (!jwt && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (jwt && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/overview", req.url));
  }
}

export const config = {
  matcher:
    "/((?!api|static|_next|.*\\.(?:js|css|map|json|png|jpg|jpeg|gif|svg|ico|webp)).*)",
};
