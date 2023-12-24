import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(request) {
	const token = request.nextauth.token;
	const { pathname } = request.nextUrl;

	if (pathname.startsWith('/pages/dashboard') && !token) {
		return NextResponse.rewrite(new URL('/', request.url));
	}

	// const allowedRoles = ['BranchManager', 'HubManager', 'Admin'];
	// if (
	// 	pathname.startsWith('/pages/dashboard/adminPage') &&
	// 	!allowedRoles.includes(token?.role)
	// ) {
	// 	return NextResponse.rewrite(new URL('/', request.url));
	// }

	// const staffRoles = ['BranchStaff', 'HubStaff'];
	// if (
	// 	(pathname.startsWith('/pages/dashboard/staffPage/branchCenter') &&
	// 		!staffRoles.includes(token?.role)) ||
	// 	(pathname.startsWith('/pages/dashboard/staffPage/hubCenter') &&
	// 		!staffRoles.includes(token?.role))
	// ) {
	// 	return NextResponse.rewrite(new URL('/', request.url));
	// }
});

export const config = {
	matcher: ['/pages/dashboard/:path*'],
};
