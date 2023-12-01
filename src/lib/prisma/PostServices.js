import { PrismaClient } from '@prisma/client';

export const revalidate = 3600;

const prisma = new PrismaClient();

async function getPost() {
	return await prisma.post.findMany({
	
	});
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
    cleanup
}

export default PostServices;