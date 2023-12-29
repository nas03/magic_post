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
		const currentDate = new Date(getFormattedDate(new Date())) as Date;
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
const getPackageReadyShip = async (location_id: number) => {
	try {
		const locationTransLog = await prisma.transshipmentLog.findMany({
			where: {
				destination_location: location_id,
				verified_timestamp: {
					not: null,
				},
			},
			select: {
				package_id: true,
			},
		});
		console.log('locTrans', locationTransLog);
		const data = await Promise.all(
			locationTransLog.map(async (transLog) => {
				const package_id = transLog.package_id;
				return await prisma.package.findUnique({
					where: {
						id: package_id,
					},
				});
			})
		);

		return data;
	} catch (error) {
		console.log('Error get package ready ship');
		return null;
	}
};
const getPackageReceivedBranch = async (location_id: number) => {
	try {
		console.log('func', location_id);

		const requestLog = await prisma.transshipmentLog.findMany({
			where: {
				request_location: {
					equals: location_id,
				},
			},
			select: {
				request_location: true,
			},
			distinct: ['request_location'],
		});

		const transLogs = await Promise.all(
			requestLog.map(async (log) => {
				const request_loc = log.request_location;

				const destinationLogs = await prisma.transshipmentLog.findMany({
					where: {
						AND: {
							destination_location: {
								equals: request_loc,
							},
							request_location: {
								equals: request_loc,
							},
						},
					},
					select: {
						package_id: true,
					},
				});

				return destinationLogs.map((destLog) => destLog.package_id);
			})
		);

		const flatPackageIds = transLogs.flat();

		const data = await Promise.all(
			flatPackageIds.map(async (package_id) => {
				const res = await prisma.package.findFirst({
					where: {
						id: {
							equals: package_id,
						},
					},
				});
				return res;
			})
		);

		return data;
	} catch (error) {
		console.error('Error getting matching request and destination:', error);
		return null;
	}
};

export {
	getPackage,
	createNewPackage,
	updatePackageState,
	getPackageTransshipmentLog,
	getBranchPackage,
	getPackageReadyShip,
	getPackageReceivedBranch,
};
