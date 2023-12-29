import {
	PackageController,
	ShipmentLogController,
} from '@/src/app/api/(controller)';
import { NextRequest, NextResponse } from 'next/server';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_id = Number(searchParams.get('location_id'));
	console.log('location_id', location_id);
	const data = await PackageController.getBranchPackage(location_id);

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
export { GET };
