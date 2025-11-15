import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const roles: string[] = token?.roles ?? [];
    const { pathname } = req.nextUrl;

    // Always allow NextAuth endpoints + Next static files
    if (
      pathname.startsWith('/api/auth') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/static')
    ) {
      return NextResponse.next();
    }

    // Allow login page to show even when not authenticated
    if (pathname === '/login') {
      return NextResponse.next();
    }

    // Redirect unauthenticated users
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // ---- RBAC RULES ----
    const deny = () =>
      NextResponse.redirect(new URL('/unauthorized', req.url));

    if (pathname.startsWith('/tpo') && !roles.includes('tpo')) {
      return deny();
    }

    if (
      pathname.startsWith('/university') &&
      !roles.some(r => ['admin', 'university'].includes(r))
    ) {
      return deny();
    }

    if (
      pathname.startsWith('/teacher') &&
      !roles.some(r => ['admin', 'teacher'].includes(r))
    ) {
      return deny();
    }

    if (
      pathname.startsWith('/student') &&
      !roles.some(r => ['admin', 'student'].includes(r))
    ) {
      return deny();
    }

    if (
      pathname.startsWith('/club') &&
      !roles.some(r => ['admin', 'club', 'teacher'].includes(r))
    ) {
      return deny();
    }

    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: ({ token }) => true, 
      // VERY IMPORTANT:
      // let middleware run even when token is null,
      // otherwise middleware never executes for unauthenticated users.
    },
  }
);

// Middleware matchers
export const config = {
  matcher: [
    '/tpo/:path*',
    '/university/:path*',
    '/club/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/login', // allow login in matcher but handle it in middleware
  ],
};
