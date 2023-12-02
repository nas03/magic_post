import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { UserServices } from '../../../../lib/prisma';

export async function POST(request: NextRequest) {
	const { full_name, email, password, role, locationID } = await request.json();

	if (password.length < 8) {
		return Response.json({
			status: 400,
			fail: 'Password must have at least 8 characters',
			message: '',
		});
	}
	const user = await UserServices.getUserByEmail(email);

	if (user != undefined) {
		return NextResponse.json({
			status: 400,
			fail: 'User already exists',
			message: '',
		});
	}
	//* HASH PASSWORD
	const salt = await bcryptjs.genSalt(10);
	const hashedPassword = await bcryptjs.hash(password, salt);

	const newUser = await UserServices.createNewUser(
		full_name,
		email,
		hashedPassword,
		role,
		locationID
	);

	return NextResponse.json({
		message: 'User created successfully',
		fail: '',
		savedUser: newUser,
	});
}
