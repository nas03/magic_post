import { metadata } from './../../../../layout';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/src/app/api/(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');
	
	let user = await User.getUser(email);
	
	if (user == null) {
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
	const { full_name, email, password, role, locationID } = await request.json();
	const newUser = User.createNewUser(
		full_name,
		email,
		password,
		role,
		locationID
	);
	if (newUser == null) {
		return NextResponse.json({
			status: 400,
			error: "Can't create new user",
		});
	}
	return NextResponse.json({
		status: 200,
		error: null,
	});
};

export { GET, POST };
