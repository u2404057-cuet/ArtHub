import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect all dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const sessionToken = request.cookies.get('better-auth.session_token');

    // If not logged in, redirect to login page
    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};