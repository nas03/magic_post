import bcryptjs from 'bcryptjs';
import prisma from '@/src/lib/prisma';
import { User_role } from '@prisma/client';
const MIN_PASSWORD_LENGTH = 8;

const createNewUser = async (
	fullName: string,
	email: string,
	password: string,
	role: User_role,
	location_id: number
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

		const newUser = await prisma.user.create({
			data: {
				fullName: fullName,
				email: email,
				password: hashedPassword,
				role: role,
				location_id: location_id,
			},
		});

		return newUser;
	} catch (error) {
		console.error(`Error creating new user: ${error}`);
		return null;
	}
};

const getUserByEmail = async (email: string | null) => {
	try {
		const data =
			email == null
				? await prisma.user.findMany()
				: await prisma.user.findUnique({
						where: {
							email: email,
						},
				  });
		return data;
	} catch (error) {
		console.error(`Error fetching user by email: ${error}`);
		return null;
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
