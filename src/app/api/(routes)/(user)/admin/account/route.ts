import { User_role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/src/app/api/(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');

	let user = await UserController.getUserByEmail(email);

	if (!user) {
		return NextResponse.json({
			status: 400,
			data: null,
		});
	}

	return NextResponse.json({
		status: 200,
		data: user,
	});
};

const POST = async (request: NextRequest) => {
	console.log('api called');
	const { fullName, email, password, role, location_id } = await request.json();

	const newUser = await UserController.createNewUser(
		fullName,
		email,
		password,
		role as User_role,
		Number(location_id)
	);
	if (!newUser) {
		return NextResponse.json({
			status: 400,
			newUser,
		});
	}
	console.log('success');
	return NextResponse.json({
		status: 200,
		newUser,
	});
};
const DELETE = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');
	const deleteUser = await UserController.deleteUser(email);
	if (!deleteUser) {
		return NextResponse.json({
			status: 400,
			deleteUser,
		});
	}
	return NextResponse.json({
		status: 200,
		deleteUser,
	});
};
export { GET, POST, DELETE };
