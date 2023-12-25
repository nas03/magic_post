import prisma from '@/src/lib/prisma';
import { ShipmentLog, TransitionLog } from '@/src/util';
//Create a new transition log
const createNewTransitionLog = async (dataLog: TransitionLog) => {
	try {
		const data = await prisma.transitionLog.create({
			data: {
				verified_timestamp: dataLog.verified_timestamp,
				request_location: dataLog.request_location,
				destination_location: dataLog.destination_location,
				location_id: dataLog.location_id,
				package_id: dataLog.package_id,
			},
		});
		return data;
	} catch (error) {
		console.log('Error creating new transition log', error);
		return null;
	}
};

const createNewShipmentLog = async (dataLog: ShipmentLog) => {
	try {
		const data = await prisma.shipmentLog.create({
			data: {
				status: dataLog.status,
				location_id: dataLog.location_id,
				package_id: dataLog.package_id,
			},
		});
		return data;
	} catch (error) {
		console.log('Error creating new shipment log', error);
		return null;
	}
};
//Verify package have been transported from transhipment hub to branch
const verifyPackageTransported = async (
	transhipment_id: number,
	verified_date: Date
) => {
	try {
		const data = await prisma.transitionLog.update({
			where: {
				id: transhipment_id,
			},
			data: {
				verified_timestamp: verified_date,
			},
		});
		return data;
	} catch (error) {
		console.log('Error verifying package transported ', error);
		return null;
	}
};
//
//Fetching statistics of success, failed package
const getPackageStatusCount = async (
	type: 'RETURNED' | 'RECEIVED',
	locationID: number
) => {
	try {
		const data =
			type === 'RETURNED'
				? await prisma.package.count({
						where: {
							destination_location_id: locationID,
							state: 'RETURNED',
						},
				  })
				: await prisma.package.count({
						where: {
							destination_location_id: locationID,
							state: 'RECEIVED',
						},
				  });
		return data;
	} catch (error) {
		console.log('Error counting received | returned package', error);
		return null;
	}
};
// Find all locations if id = 0 or specific location with the given id
const getPost = async (id: number) => {
	try {
		return id === 0
			? await prisma.location.findMany()
			: await prisma.location.findFirst({
					where: {
						id: {
							equals: id,
						},
					},
			  });
	} catch (error) {
		console.error(`Error fetching location: ${error.message}`);
	}
};

// Find posts with a location filter
const getLocationWithFilter = async (filter: string) => {
	try {
		return await prisma.location.findMany({
			where: {
				location: { contains: filter },
			},
		});
	} catch (error) {
		console.error(`Error fetching posts with filter: ${error.message}`);
	}
};

// Get the number of received or transported packages for a location with the given id
const getPackageCountForLocation = async (locationId: number) => {
	try {
		const data =
			locationId === 0
				? await prisma.locationStatistics.aggregate({
						_sum: {
							receivedCount: true,
							sentCount: true,
						},
				  })
				: await prisma.location.findUnique({
						where: { id: locationId },
						include: {
							statistics: {
								select: {
									sentCount: true,
									receivedCount: true,
								},
							},
						},
				  });
		return data;
	} catch (error) {
		console.error('Error getting package count for location:', error);
		return null;
	}
};
//Delete a location
const deleteLocationById = async (locationId: number) => {
	try {
		const existingLocation = await prisma.location.findUnique({
			where: { id: locationId },
			include: { transitionLog: true },
		});

		if (!existingLocation) {
			console.error('Location not found');
			return;
		}

		// Delete associated TransitionLog records
		const transitionLogIds = existingLocation.transitionLog.map(
			(log) => log.id
		);
		await prisma.transitionLog.deleteMany({
			where: {
				id: { in: transitionLogIds },
			},
		});

		// Delete the location
		await prisma.location.delete({
			where: { id: locationId },
		});
	} catch (error) {
		console.error(
			'Error deleting location and associated TransitionLog records:',
			error
		);
	}
};

export {
	getPost,
	getLocationWithFilter,
	getPackageCountForLocation,
	deleteLocationById,
	createNewTransitionLog,
	createNewShipmentLog,
	verifyPackageTransported,
	getPackageStatusCount,
};
