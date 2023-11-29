import { connectMongoDB } from '@/util/connect-db';
import User from '@/schemas/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

connectMongoDB();

export async function POST(request) {
	const requestBody = await request.json();
	const { email, password, confirm } = requestBody;

	if (password != confirm) {
        
		return Response.json({
			status: 400,
			fail: 'Confirm password does not match',
			message: '',
		});
	}
	if (password.length < 8) {
		return Response.json({
			status: 400,
			fail: 'Password must have at least 8 characters',
			message: '',
		});
	}

	const user = await User.findOne({ email });

	if (user != undefined) {
		return Response.json({
			status: 400,
			fail: 'User already exists',
			message: '',
		});
	}
	//* HASH PASSWORD
	const salt = await bcryptjs.genSalt(10);
	const hashedPassword = await bcryptjs.hash(password, salt);

	const newUser = new User({
		email: email,
		password: hashedPassword,
	});
	newUser.save();

	return Response.json({
		message: 'User created successfully',
		fail: '',
		savedUser: newUser,
	});
}
