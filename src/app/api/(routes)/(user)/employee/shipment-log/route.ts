import { Package_status } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { ShipmentLog } from '@/src/util';
import {
	LocationController,
	ShipmentLogController,
} from '@/src/app/api/(controller)';
const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const shipment_id = Number(searchParams.get('shipment_id'));
	//TODO: Finish this
};
const POST = async (request: NextRequest) => {
	const logData = (await request.json()) as ShipmentLog;
	const data = await ShipmentLogController.createNewShipmentLog(logData);
	if (!data) {
		return NextResponse.json({
			status: 400,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};
const PATCH = async (request: NextRequest) => {
	const { shipment_id, status } = await request.json();
	const data = await ShipmentLogController.updateShipmentLog(
		shipment_id,
		status
	);
	if (!data) {
		return NextResponse.json({
			status: 400,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};
export { GET, POST, PATCH };
