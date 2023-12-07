import { NextResponse } from 'next/server';
import { UserServices } from '@/src/lib/prisma';
import bcryptjs from 'bcryptjs';
import { PrismaClient, user_role } from '@prisma/client';

const prisma = new PrismaClient();

const MIN_PASSWORD_LENGTH = 8;

const createNewUser = async (
	full_name: string,
	email: string,
	password: string,
	role: user_role,
	locationID: number
) => {
	if (password.length < MIN_PASSWORD_LENGTH) {
		return NextResponse.json({
			status: 400,
			fail: 'Password must have at least 8 characters',
			message: '',
		});
	}

	try {
		const existingUser = await UserServices.getUserByEmail(email);

		if (existingUser) {
			return NextResponse.json({
				status: 400,
				error: 'User already exists',
				
			});
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const user_uuid = await bcryptjs.hash(email, salt);

		const newUser = await UserServices.createNewUser(
			user_uuid,
			full_name,
			email,
			hashedPassword,
			role,
			locationID
		);

		return NextResponse.json({
			success: true,
			status: 201,
			newUser,
		});
	} catch (error) {
		console.error(`Error creating new user: ${error}`);
		return NextResponse.json({
			error: 'Internal Server Error',
			status: 500,
		});
	}
};

const deleteUser = async (email: string) => {
	try {
		const deletedUser = await UserServices.deleteUser(email);

		return NextResponse.json({
			status: 200,
			success: true,
			deletedUser,
		});
	} catch (error) {
		console.error(`Error deleting user with email ${email}: ${error}`);
		return NextResponse.json({
			error: 'Internal Server Error',
			status: 500,
		});
	}
};

export { createNewUser, deleteUser };
