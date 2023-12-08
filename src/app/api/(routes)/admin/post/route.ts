import { NextRequest, NextResponse } from 'next/server';
import { user } from '@/src/app/api/(controller)';
import { PostServices, UserServices } from '@/src/lib/prisma';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const data = await PostServices.getPost();
	if (data != null) {
		return NextResponse.json({
			data: data,
			status: 200,
		});
	}
	return NextResponse.json({
		data: null,
		status: 400,
	});
};

const POST = async (request: NextRequest) => {};

const DELETE = async (request: NextRequest) => {};

export { GET, POST, DELETE };
