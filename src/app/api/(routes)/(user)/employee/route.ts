import { ShipmentLog, TransshipmentLog, getFormattedDate } from '@/src/util';
import { NextRequest, NextResponse } from 'next/server';
import {
	LocationController,
	TransshipmentLogController,
} from '@/src/app/api/(controller)';
import { User_role } from '@prisma/client';
const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_id = Number(searchParams.get('location_id'));
	const role = searchParams.get('role') as User_role;

	const data =
		role == 'BRANCH_OFFICER'
			? await LocationController.getShipmentStatistics(location_id)
			: await LocationController.getTransshipmentStatistics(location_id);

	if (!data) {
		return NextResponse.json({
			status: 500,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};
const POST = async (request: NextRequest) => {};

export { GET, POST };
