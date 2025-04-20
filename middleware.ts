import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth/login" || path === "/auth/signup" || path === "/auth/forgot-password"

  // Check if user is authenticated by looking for the user item in localStorage
  // Note: This is a simplified approach. In a real app, you'd use cookies or JWT tokens
  const isAuthenticated = request.cookies.has("user")

  // If the user is not authenticated and the path is not public, redirect to login
  if (!isAuthenticated && !isPublicPath && path !== "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If the user is authenticated and the path is public, redirect to home
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
