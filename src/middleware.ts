// export { default } from "next-auth/middleware"
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	function middleware(request) {
		console.log('token from middleware', request.nextauth.token);
		if (
			request.nextUrl.pathname.startsWith('/pages/dashboard') &&
			request.nextauth.token == null
		) {
			return NextResponse.redirect('/');
		}

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

export const config = { matcher: ['/pages/dashboard/:path*'] };
