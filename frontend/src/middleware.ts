import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll()

  const isLogin = allCookies.findIndex(cookie => cookie.name === 'accessToken');

  if (isLogin === -1) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/upload', '/gallery'],
}
