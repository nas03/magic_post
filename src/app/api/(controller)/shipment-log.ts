import { ShipmentLog } from '@/src/util';
import prisma from '@/src/lib/prisma';
import { Package_status } from '@prisma/client';
import { PackageController } from '.';
//Get transition log for a location
const createNewShipmentLog = async (dataLog: ShipmentLog) => {
	try {
		const data = await prisma.shipmentLog.create({
			data: {
				status: dataLog.status,
				location_id: dataLog.location_id,
				package_id: dataLog.package_id,
			},
		});
		const updateSent = await prisma.locationStatistics.update({
			where: {
				location_id: dataLog.location_id,
			},
			data: {
				sentCount: {
					increment: 1,
				},
			},
		});
		return {data, updateSent};
	} catch (error) {
		console.log('Error creating new shipment log', error);
		return null;
	}
};
const updateShipmentLog = async (
	shipment_id: number,
	status: Package_status
) => {
	try {
		const data = await prisma.shipmentLog.update({
			where: {
				id: shipment_id,
			},
			data: {
				status: status,
			},
		});
		const updatePackageState = await PackageController.updatePackageState(
			data.package_id,
			status
		);
		return { data, updatePackageState };
	} catch (error) {
		console.log('Error updating ShipmentLog');
		return null;
	}
};
export { createNewShipmentLog, updateShipmentLog };
