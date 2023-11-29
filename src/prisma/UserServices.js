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
	cleanup,
};

export default UserServices;
