import prisma from '@/src/lib/prisma';

const getPost = async (id: number | null) => {
	try {
		let data = null;
		if (id == null) {
			data = await prisma.post.findMany();
		} else if (id != null) {
			data = await prisma.post.findFirst({
				where: {
					post_id: {
						equals: id,
					},
				},
			});
		}
		return data;
	} catch (error) {
		console.log(`Can't get  post`);
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

const getReceivedPackageCount = async (post_id: number | null) => {
	try {
		let data = null;
		if (post_id != null) {
			data = await prisma.post.aggregate({
				where: {
					post_id: {
						equals: post_id,
					},
				},
				_sum: {
					received_package: true,
				},
			});
		} else if (post_id == null) {
			data = await prisma.post.aggregate({
				_sum: {
					received_package: true,
				},
			});
		}
		return data;
	} catch (error) {
		console.log('Error counting package each post');
		return null;
	}
};

const getTransportedPackageCount = async (post_id: number | null) => {
	try {
		let data = null;
		if (post_id != null) {
			data = await prisma.post.aggregate({
				where: {
					post_id: {
						equals: post_id,
					},
				},
				_sum: {
					transported_package: true,
				},
			});
		} else if (post_id == null) {
			data = await prisma.post.aggregate({
				_sum: {
					transported_package: true,
				},
			});
		}
		return data;
	} catch (error) {
		console.log('Error counting package each post');
		return null;
	}
};

export {
	getPost,
	getPostWithFilter,
	getReceivedPackageCount,
	getTransportedPackageCount,
};
