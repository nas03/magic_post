import { Package_status } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {
	LocationController,
	PackageController,
	TransshipmentLogController,
} from '@/src/app/api/(controller)';
import { TransshipmentLog, getFormattedDate } from '@/src/util';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_id = Number(searchParams.get('location_id'));
	const data = await TransshipmentLogController.getTransshipmentLogBranch(
		location_id
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
const POST = async (request: NextRequest) => {
	const {
		verified_timestamp,
		request_location,
		destination_location,
		location_id,
		package_id,
	} = await request.json();
	//TODO: check if package sent to branch instead of hub
	const newTransshipmentLog =
		await TransshipmentLogController.createNewTransshipmentLog(
			Number(package_id),
			Number(request_location),
			Number(destination_location),
			Number(location_id),
			verified_timestamp
		);
	if (!newTransshipmentLog) {
		return NextResponse.json({
			status: 400,
			newTransshipmentLog: null,
		});
	}
	return NextResponse.json({
		status: 200,
		newTransshipmentLog,
	});
};
const PATCH = async (request: NextRequest) => {
	const { location_id, transshipment_id } = await request.json();

	// console.log('id', transshipment_id, dataRes);
	const data = await LocationController.verifyPackageTransported(
		Number(transshipment_id),
		Number(location_id)
	);
	if (!data) {
		return NextResponse.json({
			status: 500,
			data,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};
export { POST, GET, PATCH };
