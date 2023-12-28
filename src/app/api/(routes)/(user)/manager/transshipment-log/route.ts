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
	const data = await TransshipmentLogController.getTransshipmentLog(
		location_id
	);
	if (!data || !data[0]) {
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
	const logData = (await request.json()) as TransshipmentLog;
	//TODO: check if package sent to branch instead of hub
	const newTransshipmentLog =
		await TransshipmentLogController.createNewTransshipmentLog(logData);
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
	const dataRes = await request.json();
	const { transhipment_id } = dataRes;
	const data = await LocationController.verifyPackageTransported(
		Number(transhipment_id),
		getFormattedDate(new Date())
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
