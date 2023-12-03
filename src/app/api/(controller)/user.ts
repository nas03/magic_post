import { NextResponse } from 'next/server';
import { UserServices } from '@/src/lib/prisma';
import bcryptjs from 'bcryptjs';
import { PrismaClient, user_role } from '@prisma/client';

const prisma = new PrismaClient();
const createNewUser = async (
	full_name: string,
	email: string,
	password: string,
	role: user_role,
	locationID: number
) => {
	if (password.length < 8) {
		return NextResponse.json({
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
		success: true,
		status: 201,
		newUser,
	});
};

const deleteUser = async (email: string) => {
	try {
		const deleteUser = await UserServices.deleteUser(email);
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
};

export {createNewUser, deleteUser}
