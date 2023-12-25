import prisma from '@/src/lib/prisma';
import { Package_status } from '@prisma/client';
//Get all packages if id = 0 or specific package with id != 0
const getPackage = async (id: number) => {
	try {
		const data =
			id === 0
				? await prisma.package.findMany()
				: await prisma.package.findFirst({
						where: {
							id: {
								equals: id,
							},
						},
				  });
		return data;
	} catch (error) {
		console.log('Error getting packages', error);
		return null;
	}
};
//Get status of package with id

//Create new package
const createNewPackage = async (...data: any) => {
	try {
		const newPackage = prisma.package.create({
			data: {
				...data,
			},
		});
		return newPackage;
	} catch (error) {
		console.log('Error create new package', error);
		return null;
	}
};

//Update package status
const updatePackageStatus = async (
	id: number,
	packageStatus: Package_status
) => {
	try {
		const data = prisma.package.update({
			where: {
				id: id,
			},
			data: {
				state: packageStatus,
			},
		});
		return data;
	} catch (error) {
		console.log(`Error updating package status`, error);
		return null;
	}
};

export { getPackage, createNewPackage };
