import { User_role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/src/app/api/(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const user_type = searchParams.get('user_type') as User_role;

	let user = await UserController.getUserByType(user_type);

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
const PATCH = async (request: NextRequest) => {
	const { id, name, email, role, location_id } = await request.json();
	const data = await UserController.updateUserWithID(
		Number(id),
		name,
		email,
		Number(location_id),
		role
	);
	if (!data) {
		return NextResponse.json({
			status: 400,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};
const DELETE = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	console.log('routes', searchParams);
	const email = searchParams.get('email');
	console.log('route email', email);
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
export { GET, POST, DELETE, PATCH };
