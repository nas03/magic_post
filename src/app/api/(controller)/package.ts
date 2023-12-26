import prisma from '@/src/lib/prisma';
import { Package_status } from '@prisma/client';
import { Package, getFormattedDate, TransitionLog } from '@/src/util';
import { Location } from '@/src/app/api/(controller)';
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
//Get transition log of package with id
const getPackageTransitionLog = async (package_id: number) => {
	try {
		const data = await prisma.transitionLog.findMany({
			where: {
				package_id: {
					equals: package_id,
				},
			},
		});
		return data;
	} catch (error) {
		console.log("Error fetching package's transition log", error);
		return null;
	}
};
//Create new package
const createNewPackage = async (data: Package) => {
	try {
		const newPackage = await prisma.package.create({
			data: {
				sender: data.sender,
				receiver: data.receiver,
				sender_location: data.sender_location,
				receiver_location: data.receiver_location,
				sender_phone: data.sender_phone,
				receiver_phone: data.receiver_phone,
				type: data.type,
				fee: data.fee,
				received_location_id: data.received_location_id,
				destination_location_id: data.destination_location_id,
			},
		});
		const currentDate = getFormattedDate(new Date()) as Date;
		const logData: TransitionLog = {
			verified_timestamp: currentDate,
			request_location: data.received_location_id,
			destination_location: data.received_location_id,
			location_id: data.received_location_id,
			package_id: newPackage.id,
		};
		const newTransitionLog = await Location.createNewTransitionLog(logData);
		return { newPackage, newTransitionLog };
	} catch (error) {
		console.log('Error create new package', error);
		return null;
	}
};

//Update package status
const updatePackageState = async (
	package_id: number,
	package_status: Package_status
) => {
	try {
		const data = await prisma.package.update({
			where: {
				id: package_id,
			},
			data: {
				state: package_status,
			},
		});
		return data;
	} catch (error) {
		console.log(`Error updating package status`, error);
		return null;
	}
};

export {
	getPackage,
	createNewPackage,
	updatePackageState,
	getPackageTransitionLog,
};
