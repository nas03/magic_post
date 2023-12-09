import { NextRequest, NextResponse } from 'next/server';
import { Post, User } from '@/src/app/api/(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const data = await Post.getPost();
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
