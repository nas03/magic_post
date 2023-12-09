import prisma from '@/src/lib/prisma';

const getPost = async () => {
	try {
		const data = await prisma.post.findMany();
		return data;
	} catch (error) {
		console.log(`Can't get all post`);
	}
};
const getPostWithFilter = async (filter: string) => {
	try {
		const result = await prisma.post.findMany({
			where: {
				location: {
					contains: filter,
				},
			},
		});
		return result;
	} catch (error) {
		console.log('No records were found');
	}
};


export {getPost, getPostWithFilter}