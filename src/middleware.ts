import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isTryingToAccessApp = req.nextUrl.pathname.includes("/app");
  const hasAccess = req.auth?.user.hasAccess;
  const pathname = req.nextUrl.pathname;

  if (!isLoggedIn && isTryingToAccessApp) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoggedIn && isTryingToAccessApp && !hasAccess) {
    return NextResponse.redirect(new URL("/payment", req.nextUrl));
  }

  if (isLoggedIn && hasAccess) {
    if (pathname === "/" || pathname === "/app") {
      return NextResponse.redirect(new URL("/app/dashboard", req.nextUrl));
    }
    if (
      pathname.includes("/login") ||
      pathname.includes("/signup") ||
      pathname.includes("/payment")
    ) {
      return NextResponse.redirect(new URL("/app/dashboard", req.nextUrl));
    }
  }

  if (isLoggedIn && !hasAccess) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/payment", req.nextUrl));
    }
    if (pathname.includes("/login")) {
      return NextResponse.redirect(new URL("/payment", req.nextUrl));
    }
    if (pathname.includes("/payment")) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
