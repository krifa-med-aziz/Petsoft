import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isTryingToAccessApp = req.nextUrl.pathname.includes("/app");
  const hasAccess = req.auth?.user.hasAccess;

  if (!isLoggedIn && isTryingToAccessApp) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isLoggedIn && isTryingToAccessApp && !hasAccess) {
    return NextResponse.redirect(new URL("/payment", req.nextUrl));
  }

  if (isLoggedIn && !isTryingToAccessApp) {
    if (
      req.nextUrl.pathname.includes("/login") ||
      (req.nextUrl.pathname.includes("/signup") && !hasAccess)
    ) {
      return NextResponse.redirect(new URL("/payment", req.nextUrl));
    }
    if (
      hasAccess &&
      (req.nextUrl.pathname.includes("/login") ||
        req.nextUrl.pathname.includes("/signup") ||
        req.nextUrl.pathname.includes("/payment"))
    ) {
      return NextResponse.redirect(new URL("/app/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
