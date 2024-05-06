import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { IUser } from './types/user';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth as { token: { user: IUser } };

    // console.log({ pathname, origin, token });

    if (pathname.startsWith('/dashboard') && token?.user?.role !== 'admin') {
      return new NextResponse(
        'No access. You need to get administrator rights!',
        { status: 403 }
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = { matcher: ['/dashboard', '/dashboard/customers'] };
