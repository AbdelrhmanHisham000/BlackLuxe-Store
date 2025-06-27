import { auth } from "./_lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/checkout")) {
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next(); //This just means: if nothing is blocked, allow the request to continue.
}

export const config = {
  matcher: ["/dashboard/:path*", "/checkout", "/checkout/:path*"],
};
