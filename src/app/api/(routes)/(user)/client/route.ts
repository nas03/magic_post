import { NextRequest, NextResponse } from 'next/server';
import {
	LocationController,
	PackageController,
} from '@/src/app/api/(controller)';
import { Package, TransshipmentLog } from '@/src/util';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const package_id = Number(searchParams.get('package_id'));
	const transshipmentLog = await PackageController.getPackageTransshipmentLog(
		package_id
	);
	const location = transshipmentLog.map(async (d: TransshipmentLog) => {
		return await LocationController.getLocation(d.request_location);
	});
	const fetchPackage = await PackageController.getPackage(package_id);
	const packageStatus = await fetchPackage[11];
	const data = {
		location,
		packageStatus,
		transshipmentLog,
	};
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

export { GET };
