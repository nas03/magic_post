import bcryptjs from 'bcryptjs';
import { user_role } from '@prisma/client';
import prisma from '@/src/lib/prisma';

const MIN_PASSWORD_LENGTH = 8;

const createNewUser = async (
	full_name: string,
	email: string,
	password: string,
	role: user_role,
	post_id: number
) => {
	if (password.length < MIN_PASSWORD_LENGTH) {
		return null;
	}

	try {
		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			return null;
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const user_uuid = await bcryptjs.hash(email, salt);

		const newUser = await prisma.user.create({
			data: {
				uuid: user_uuid,
				full_name,
				email,
				password: hashedPassword,
				role,
				post_id: post_id,
			},
		});

		return Promise.resolve(newUser);
	} catch (error) {
		console.error(`Error creating new user: ${error}`);
		return null;
	}
};

const getUserByEmail = async (email: string | null) => {
	if (email == null) {
		try {
			const users = await prisma.user.findMany();
			return users;
		} catch (error) {
			console.log('Error fetching all users', error);
			return null;
		}
	}

	try {
		const user = await prisma.user.findMany({
			where: {
				email: { equals: email },
			},
		});
		return user;
	} catch (error) {
		console.error(`Error fetching user by email: ${error}`);
		throw error;
	}
};

const deleteUser = async (email: string) => {
	try {
		const deletedUser = await prisma.user.delete({
			where: { email },
		});
		return deletedUser;
	} catch (error) {
		console.error(`Error deleting user with email ${email}: ${error}`);
		return null;
	}
};

export { createNewUser, getUserByEmail, deleteUser };
