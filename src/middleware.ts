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
			console.log(request.nextauth.token)
			return NextResponse.rewrite(new URL('/', request.url));
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);
