// export { default } from "next-auth/middleware"
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	function middleware(request) {
		if (
			request.nextUrl.pathname.startsWith('/pages/dashboard') &&
			request.nextauth.token?.role !== 'BranchManager' &&
			request.nextauth.token?.role !== 'HubManager' &&
			request.nextauth.token?.role !== 'Admin'
		) {
			return NextResponse.rewrite(new URL('/', request.url));
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				console.log('called from middleware');
				return !!token;
			},
		},
	}
);

export const config = { matcher: ['/dashboard/:path*'] };
