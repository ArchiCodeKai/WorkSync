import { NextResponse } from 'next/server'

export function middleware(req: Request) {
  // Allow all requests to pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude NextAuth routes, static files, and images
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}