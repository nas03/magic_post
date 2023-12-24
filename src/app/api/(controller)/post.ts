import prisma from '@/src/lib/prisma';

// Find all posts if id = 0 or specific post with the given id
const getPost = async (id: number) => {
	try {
		return id === 0
			? await prisma.post.findMany()
			: await prisma.post.findFirst({
					where: {
						post_id: { equals: id },
					},
			  });
	} catch (error) {
		console.error(`Error fetching post: ${error.message}`);
	}
};

// Find posts with a location filter
const getPostWithFilter = async (filter: string) => {
	try {
		return await prisma.post.findMany({
			where: {
				location: { contains: filter },
			},
		});
	} catch (error) {
		console.error(`Error fetching posts with filter: ${error.message}`);
	}
};

// Get the number of received or transported packages for a post with the given id
const getPackageCount = async (
	post_id: number,
	packageType: 'received' | 'transported'
) => {
	try {
		const data =
			post_id !== 0
				? await prisma.post.aggregate({
						where: {
							post_id: {
								equals: post_id,
							},
						},
						_sum: {
							[`${packageType}_package`]: true,
						},
				  })
				: await prisma.post.aggregate({
						_sum: {
							[`${packageType}_package`]: true,
						},
				  });

		return data;
	} catch (error) {
		console.error(
			`Error counting ${packageType} packages for post: ${error.message}`
		);
		return null;
	}
};

// Get the number of received packages for a post with the given id
const getReceivedPackageCount = async (post_id: number) =>
	getPackageCount(post_id, 'received');

// Get the number of transported packages for a post with the given id
const getTransportedPackageCount = async (post_id: number) =>
	getPackageCount(post_id, 'transported');

export {
	getPost,
	getPostWithFilter,
	getReceivedPackageCount,
	getTransportedPackageCount,
};
