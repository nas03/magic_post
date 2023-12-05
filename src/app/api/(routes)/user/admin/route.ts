import { NextRequest, NextResponse } from 'next/server';
import { user } from '@/src/app/api/(controller)';
import { UserServices } from '@/src/lib/prisma';
const POST = async (request: NextRequest) => {};
const DELETE = async (request: NextRequest) => {
	try {
		const deleteUser = await UserServices.deleteUser(
			'sonanhnguyen003@gmail.com'
		);
		return NextResponse.json({
			status: 200,
			success: true,
			deleteUser,
		});
	} catch (error) {
		console.error(`Error deleting user with email`);
		return NextResponse.json({
			error: 'Internal Server Error',
			status: 500,
		});
	}
}
const GET = async (request: NextRequest) => {
	const {searchParams} = new URL (request.url)
	const action = searchParams.get('action');
	const filter = searchParams.get('filter');
	if(action === 'get-all-posts') {
		//TODO:
		if(filter === 'hanoi') {
			//TODO:
		}
	}
};

export {GET, POST, DELETE}
