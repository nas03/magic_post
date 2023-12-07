import { PrismaClient } from '@prisma/client';

export const revalidate = 3600;

const prisma = new PrismaClient();

async function getPost() {
	return await prisma.post.findMany({});
}
async function getPostWithFilter(filter: string) {
	try {
		const result = await prisma.post.findMany({
			where: {
				location: {
					contains: filter,
				},
			},
		});
		cleanup();
		return result;
	} catch (error) {
		console.log('No records were found');
	}
}
const cleanup = async () => {
	try {
		await prisma.$disconnect();
	} catch (error) {
		console.error('Error disconnecting from Prisma:', error);
		throw error;
	}
};

const PostServices = {
	getPost,
	getPostWithFilter,
	cleanup,
};

export default PostServices;
