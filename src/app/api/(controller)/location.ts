import prisma from '@/src/lib/prisma';
import { ShipmentLog, TransshipmentLog } from '@/src/util';

//Verify package have been transported from transhipment hub to branch
const verifyPackageTransported = async (
	transhipment_id: number,
	verified_date: Date
) => {
	try {
		const data = await prisma.transshipmentLog.update({
			where: {
				id: transhipment_id,
			},
			data: {
				verified_timestamp: verified_date,
			},
		});
		const updateReceived = await prisma.locationStatistics.update({
			where: {
				location_id: data.destination_location,
			},
			data: {
				receivedCount: {
					increment: 1,
				},
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
const getShipmentStatistics = async (locationID: number) => {
	try {
		const returnedCount = await prisma.package.count({
			where: {
				destination_location_id: locationID,
				state: 'RETURNED',
			},
		});
		const receivedCount = await prisma.package.count({
			where: {
				destination_location_id: locationID,
				state: 'RECEIVED',
			},
		});
		return {
			returnedCount,
			receivedCount,
		};
	} catch (error) {
		console.log('Error counting received | returned package', error);
		return null;
	}
};
// Find all locations if id = 0 or specific location with the given id
const getLocation = async (location_id: number) => {
	try {
		return location_id === 0
			? await prisma.location.findMany()
			: await prisma.location.findFirst({
					where: {
						id: {
							equals: location_id,
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
const getTransshipmentStatistics = async (locationId: number) => {
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
			include: { transshipmentLog: true },
		});

		if (!existingLocation) {
			console.error('Location not found');
			return;
		}

		// Delete associated TransshipmentLog records
		const transitionLogIds = existingLocation.transshipmentLog.map(
			(log) => log.id
		);
		await prisma.transshipmentLog.deleteMany({
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
			'Error deleting location and associated TransshipmentLog records:',
			error
		);
	}
};

export {
	getLocation,
	getLocationWithFilter,
	getTransshipmentStatistics,
	deleteLocationById,
	verifyPackageTransported,
	getShipmentStatistics,
};
