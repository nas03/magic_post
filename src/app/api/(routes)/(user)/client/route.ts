import { NextRequest, NextResponse } from 'next/server';
import {
	LocationController,
	PackageController,
	TransshipmentLogController,
} from '@/src/app/api/(controller)';
import { Package, TransshipmentLog } from '@/src/util';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const package_id = Number(searchParams.get('package_id'));
	const data = await TransshipmentLogController.getPackageLog(package_id);
	console.log('data', data);
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
