import { PrismaClient } from '@prisma/client';
import exp from 'constants';

export const revalidate = 3600;

const prisma = new PrismaClient();

const cleanup = async () => {
	try {
		await prisma.$disconnect();
	} catch (error) {
		console.error('Error disconnecting from Prisma:', error);
		throw error;
	}
};

const PackageServices = {
    cleanup
}
export default PackageServices