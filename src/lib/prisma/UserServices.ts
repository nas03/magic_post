import { PrismaClient, user_role } from '@prisma/client';

const prisma = new PrismaClient();

const getUserByEmail = async (email: string) => {
	try {
		prisma.$connect;
		const user = await prisma.user.findMany({
			where: {
				email: {
					equals: email,
				},
			},
		});
		cleanup();
		return user;
	} catch (error) {
		console.error("Can't get user by email", error);
		throw error;
	}
};

const createNewUser = async (
	uuid: string,
	full_name: string,
	email: string,
	password: string,
	role: user_role,
	location_id: number
) => {
	try {
		const newUser = await prisma.user.create({
			data: {
				uuid: uuid,
				full_name: full_name,
				email: email,
				password: password,
				role: role,
				location_id: location_id,
			},
		});
		cleanup();
		Promise.resolve(newUser);
	} catch (error) {
		console.error("Can't create new user");
		throw error;
	}
};

const deleteUser = async (email: string) => {
	try {
		const deletedUser = await prisma.user.delete({
			where: {
				email: email,
			},
		});
		cleanup();
		return deletedUser;
	} catch (error) {
		console.error(`Error deleting user with email`);
		throw error;
	}
};

const cleanup = async () => {
	try {
		await prisma.$disconnect();
	} catch (error) {
		console.error('Error disconnecting from Prisma:', error);
		throw error;
	}
};

const UserServices = {
	getUserByEmail,
	createNewUser,
	deleteUser,
	cleanup,
};

export default UserServices;
