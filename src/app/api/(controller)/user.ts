import bcryptjs from 'bcryptjs';
import { user_role } from '@prisma/client';
import prisma from '@/src/lib/prisma';

const MIN_PASSWORD_LENGTH = 8;

const createNewUser = async (
	full_name: string,
	email: string,
	password: string,
	role: user_role,
	locationID: number
) => {
	if (password.length < MIN_PASSWORD_LENGTH) {
		return null;
	}

	try {
		const existingUser = await getUser(email);
		if (existingUser) {
			return null;
		}
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const user_uuid = await bcryptjs.hash(email, salt);
		const newUser = await prisma.user.create({
			data: {
				uuid: user_uuid,
				full_name: full_name,
				email: email,
				password: hashedPassword,
				role: role,
				location_id: locationID,
			},
		});

		return Promise.resolve(newUser);
	} catch (error) {
		console.error(`Error creating new user: ${error}`);
		return null;
	}
};

const getUser = async (email: string | null) => {
	if (email == null) {
		try {
			const users = await prisma.user.findMany();
			return users;
		} catch (error) {
			console.log('Cant get all user');
			return null;
		}
	}
	if (email != null) {
		try {
			const user = await prisma.user.findMany({
				where: {
					email: {
						equals: email,
					},
				},
			});
			return user;
		} catch (error) {
			console.error("Can't get user by email", error);
			throw error;
		}
	}
};

const deleteUser = async (email: string) => {
	try {
		const deletedUser = await prisma.user.delete({
			where: {
				email: email,
			},
		});
		return deletedUser;
	} catch (error) {
		console.error(`Error deleting user with email ${email}: ${error}`);
		return null;
	}
};

export { createNewUser, getUser, deleteUser };
