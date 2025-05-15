import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value
  const { pathname } = request.nextUrl

  // If no session token and trying to access protected routes
  if (!sessionToken && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If has session token and trying to access login page
  if (sessionToken && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
