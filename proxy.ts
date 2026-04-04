import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Role = "admin" | "buyer";

const protectedRoutes = [
  { path: "/dashboard", roles: ["admin", "buyer"] },
  { path: "/admin", roles: ["admin"] },
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("refreshToken")?.value;
  const role = request.cookies.get("role")?.value as Role | undefined;

  const matchedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route.path),
  );

  if (matchedRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (matchedRoute.roles && role && !matchedRoute.roles.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
