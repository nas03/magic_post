import { connectMongoDB } from '@/util/connect-db';
import User from '@/schemas/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { UserServices } from '../../../../lib/prisma';

export async function POST(request) {
	const { email, password, role, locationID } = await request.json();

	if (password.length < 8) {
		return Response.json({
			status: 400,
			fail: 'Password must have at least 8 characters',
			message: '',
		});
	}
	const user = await UserServices.getUserByEmail(email);

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

	const newUser = await UserServices.createNewUser(
		email,
		hashedPassword,
		role,
		locationID
	);

	return Response.json({
		message: 'User created successfully',
		fail: '',
		savedUser: newUser,
	});
}
