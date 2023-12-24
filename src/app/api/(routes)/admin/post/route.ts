import { NextRequest, NextResponse } from 'next/server';
import { Post, User } from '@/src/app/api/(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');
	const data = await Post.getPost(Number(id));

	if (!data) {
		return NextResponse.json({
			data: null,
			status: 400,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};

const POST = async (request: NextRequest) => {};

const DELETE = async (request: NextRequest) => {};

export { GET, POST, DELETE };
