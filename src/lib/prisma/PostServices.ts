

import prisma from "./prisma";

export const revalidate = 3600;



async function getPost() {
	try {
		const data = await prisma.post.findMany();
		cleanup();
		return data;
	} catch (error) {
		console.log(`Can't get all post`)
	}
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
