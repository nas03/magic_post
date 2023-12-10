import { PrismaClient } from '@prisma/client';
import prisma from '@/src/lib/prisma';

const getPackage = async (id: number | null) => {
	try {
		let data = null;
		if (id != null) {
			data = await prisma.renamedpackage.findFirst({
				where: {
					package_id: {
						equals: id,
					},
				},
			});
		} else if (id == null) {
			data = await prisma.renamedpackage.findMany();
		}
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

export { getPackageStatus, getPackage };
