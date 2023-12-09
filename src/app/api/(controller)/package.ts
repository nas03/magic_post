import { PrismaClient } from '@prisma/client';
import prisma from '@/src/lib/prisma';

const getPackageWithID = async (id: number) => {
	try {
		const data = await prisma.renamedpackage.findFirst({
			where: {
				package_id: {
					equals: id,
				},
			},
		});
		return data;
	} catch (error) {
		console.log("Can't get package by id");
		throw error;
	}
};

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

export { getPackageStatus, getPackageWithID };
