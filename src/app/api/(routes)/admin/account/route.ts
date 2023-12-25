import { metadata } from '../../../../layout';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/src/app/api/(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');

	let user = await User.getUserByEmail(email);

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
	const { fullName, email, password, role, location_id } = await request.json();
	const newUser = await User.createNewUser(
		email,
		fullName,
		password,
		role,
		location_id
	);
	if (!newUser) {
		return NextResponse.json({
			status: 400,
			newUser,
		});
	}
	return NextResponse.json({
		status: 200,
		newUser,
	});
};
const DELETE = async (request: NextRequest) => {
	const {searchParams} = new URL(request.url);
	const email = searchParams.get('email');
	const deleteUser = await User.deleteUser(email);
	if(!deleteUser) {
		return NextResponse.json({
			status: 400,
			deleteUser
		})
	}
	return NextResponse.json({
		status: 200,
		deleteUser
	})
};
export { GET, POST, DELETE };
