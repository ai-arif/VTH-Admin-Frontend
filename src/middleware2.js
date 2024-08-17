import { NextResponse } from "next/server";

const publicRoutes = ["/auth/login", "/auth/forget-password", "/auth/reset-password"];

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Check if the route is public
  const isPublicRoute = publicRoutes.includes(pathname);
  if (isPublicRoute) {
    if (token) {
      // Redirect authenticated users away from public routes if already logged in
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Allow access to public routes
    return NextResponse.next();
  }

  // If route is private and user is not authenticated, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Allow the request to proceed for authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/forget-password",
    "/auth/reset-password",
    "/test-result/:path*",
    "/appointment/:path*",
    "/departments/:path*",
    "/frontend-management/:path*",
    "/incomming-test/:path*",
    "/medicine/:path*",
    "/notifications/:path*",
    "/patient-registration/:path*",
    "/pharmacy/:path*",
    "/prescription/:path*",
    "/settings/:path*",
    "/species-complaints/:path*",
    "/staffs/:path*",
    "/test-parameter/:path*",
    "/test-prescription/:path*",
    "/test-result/:path*",
    "/tests/:path*",
    "/users/:path*",
    "/payments-overview/:path*",
  ],
};
