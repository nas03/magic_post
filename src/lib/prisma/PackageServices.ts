import { PrismaClient } from '@prisma/client';
import prisma from './prisma';

const getPackageStatus = async (id: number) => {
	try {
		const data = await prisma.status.findMany({
			where: {
				package_id: {
					equals: id,
				},
			},
		});
		return data;
	} catch (error) {
		console.log(`Can't get package status`);
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

const PackageServices = {
	getPackageStatus,
	cleanup,
};
export default PackageServices;
