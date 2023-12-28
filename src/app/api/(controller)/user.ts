import bcryptjs from 'bcryptjs';
import prisma from '@/src/lib/prisma';
import { User_role } from '@prisma/client';
import { equal } from 'assert';
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
		if (existingUser[0] != null) {
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
		if (!newUser) {
			console.log('Failed creating new USerer');
		}
		return newUser;
	} catch (error) {
		console.error(`Error creating new user: ${error}`);
		return null;
	}
};
const getUserByType = async (userType: User_role) => {
	try {
		return prisma.user.findMany({
			where: {
				role: userType,
			},
		});
	} catch (error) {
		console.log('Error get user by type', error);
		return null;
	}
};
const getUserByEmail = async (email: string | null) => {
	try {
		const data =
			email == null
				? await prisma.user.findMany()
				: await prisma.user.findMany({
						where: {
							email: {
								equals: email,
							},
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
			where: { email: email },
		});
		return deletedUser;
	} catch (error) {
		console.error(`Error deleting user with email ${email}: ${error}`);
		return null;
	}
};
const updateUserWithID = async (
	id: number,
	fullName: string,
	email: string,
	location_id: number,
	role: User_role
) => {
	try {
		const data = await prisma.user.update({
			where: {
				id: Number(id),
			},
			data: {
				fullName: fullName,
				email: email,
				location_id: location_id,
				role: role,
			},
		});
		return data;
	} catch (error) {
		console.log('Error updating user', error);
		return null;
	}
};
export {
	createNewUser,
	getUserByEmail,
	deleteUser,
	getUserByType,
	updateUserWithID,
};
