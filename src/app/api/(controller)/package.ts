import { equal } from 'assert';
import prisma from '@/src/lib/prisma';
import { Package_status } from '@prisma/client';
import { Package, getFormattedDate, TransshipmentLog } from '@/src/util';
import {
	LocationController,
	TransshipmentLogController,
} from '@/src/app/api/(controller)';
//Get all packages if id = 0 or specific package with id != 0
const getPackage = async (package_id: number) => {
	try {
		const data =
			package_id == 0
				? await prisma.package.findMany()
				: await prisma.package.findUnique({
						where: {
							id: package_id,
						},
						select: {
							id: true,
							sender: true,
							receiver: true,
							sender_location: true,
							receiver_location: true,
							sender_phone: true,
							receiver_phone: true,
							type: true,
							fee: true,
							received_location_id: true,
							destination_location_id: true,
							state: true,
							shipment_id: true,
						},
				  });
		return data;
	} catch (error) {
		console.log('Error getting packages', error);
		return null;
	}
};
//Get transition log of package with id
const getPackageTransshipmentLog = async (package_id: number) => {
	try {
		const data = await prisma.transshipmentLog.findMany({
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
//Get packages received by location
const getBranchPackage = async (location_id: number) => {
	try {
		const data = await prisma.package.findMany({
			where: {
				OR: [
					{
						received_location_id: {
							equals: location_id,
						},
					},
					{
						destination_location_id: {
							equals: location_id,
						},
						state: {
							equals: 'RECEIVED',
						},
					},
				],
			},
		});
		return data;
	} catch (error) {
		console.log('Error get Package received by location');
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
		const logData: TransshipmentLog = {
			verified_timestamp: currentDate,
			request_location: data.received_location_id,
			destination_location: data.received_location_id,
			location_id: data.received_location_id,
			package_id: newPackage.id,
		};
		const newTransshipmentLog =
			await TransshipmentLogController.createNewTransshipmentLog(logData);
		const updateReceived = await prisma.locationStatistics.update({
			where: {
				location_id: data.received_location_id,
			},
			data: {
				receivedCount: {
					increment: 1,
				},
			},
		});
		return { newPackage, newTransshipmentLog, updateReceived };
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
	getPackageTransshipmentLog,
	getBranchPackage,
};
