import { PrismaClient } from '@prisma/client';

export const revalidate = 3600;

const prisma = new PrismaClient();

export async function getUserById(id) {
	const data = await prisma.user.findMany({
		where: {
			uuid: {
				equals: id,
			},
		},
	});
	cleanup();
	return data;
}
export async function getPost() {
	return await prisma.post.findMany({
	
	});
}
export const cleanup = async () => {
	try {
		await prisma.$disconnect();
	} catch (error) {
		console.error('Error disconnecting from Prisma:', error);
		throw error;
	}
};
