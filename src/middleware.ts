import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
    error: '/error',
  },
});

export const config = {
  matcher: ['/learn', '/learn/:path*', '/quiz/:path*', '/result'],
};
