import { PrismaClient } from '@prisma/client';

export const revalidate = 3600;

const prisma = new PrismaClient();

async function getUserById(id) {
	const data = await prisma.user.findMany({
		where: {
			user_id: {
				equals: id,
			},
		},
	});
	cleanup();
	return data;
}

const getUserByEmail = async (email) => {
	try {
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
		console.error("Can't get user by email");
		throw error;
	}
};

const createNewUser = async (email, password, role, locationID) => {
	try {
		const newUser = await prisma.user.create({
			data: {
				email: email,
				password: password,
				role: role,
				location_id: locationID,
			},
		});
		cleanup();
		return newUser;
	} catch (error) {
		console.error("Can't create new user");
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
	revalidate,
	getUserById,
	getUserByEmail,
	createNewUser,
	cleanup,
};

export default UserServices;
