import { NextRequest, NextResponse } from 'next/server';
import { User, Location } from '@/src/app/api/(controller)';
import { env } from 'process';
import { getToken } from 'next-auth/jwt';
import nextAuth from 'next-auth';

const GET = async (request: NextRequest) => {
	// const token = await getToken({
	// 	req: request,
	// 	secret: process.env.NEXTAUTH_SECRET
	// });
	// if (token == null) {
	// 	return NextResponse.json({
	// 		status: 305,
	// 		data: null,
	// 	});
	// }
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');
	const data = await LocationController.getPost(Number(id));
	if (!data) {
		return NextResponse.json({
			status: 500,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data: data,
	});
};
const POST = async (request: NextRequest) => {};
const PATCH = async (request: NextRequest) => {};
const DELETE = async (request: NextRequest) => {};

export { GET, POST, DELETE, PATCH };
