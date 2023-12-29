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
	const data = TransshipmentLogController.getPackageLog(package_id);
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
