import { TransshipmentLog } from '@/src/util';
import prisma from '@/src/lib/prisma';
const getTransshipmentLog = async (location_id: number) => {
	try {
		const data = await prisma.transshipmentLog.findMany({
			where: {
				location_id: {
					equals: location_id,
				},
			},
		});
		return data;
	} catch (error) {
		console.log('Error fetching transition log data', error);
		return null;
	}
};
//Create a new transition log
const createNewTransshipmentLog = async (dataLog: TransshipmentLog) => {
	try {
		const data = await prisma.transshipmentLog.create({
			data: {
				verified_timestamp: dataLog.verified_timestamp,
				request_location: dataLog.request_location,
				destination_location: dataLog.destination_location,
				location_id: dataLog.location_id,
				package_id: dataLog.package_id,
			},
		});
		const updateSent = await prisma.locationStatistics.update({
			where: {
				location_id: data.request_location,
			},
			data: {
				sentCount: {
					increment: 1,
				},
			},
		});
		console.log(updateSent);
		return data;
	} catch (error) {
		console.log('Error creating new transition log', error);
		return null;
	}
};
const getPackageLog = async (orderNumber: number) => {
	console.log('order', orderNumber);
	const data = await prisma.transshipmentLog.findMany({
		where: {
			AND: {
				package_id: {
					equals: Number(orderNumber),
				},
				verified_timestamp: {
					not: {
						equals: null,
					},
				},
			},
		},
		select: {
			destination_location: true,
		},
	});
	console.log('data', data);
	const loc = await Promise.all(
		data.map(async (log) => {
			const des = log.destination_location;
			const location = await prisma.location.findMany({
				where: {
					id: {
						equals: des,
					},
				},
				select: {
					name: true,
				},
			});
			return location;
		})
	);
	const res = loc.flat();
	return res;
};
export { createNewTransshipmentLog, getTransshipmentLog, getPackageLog };
