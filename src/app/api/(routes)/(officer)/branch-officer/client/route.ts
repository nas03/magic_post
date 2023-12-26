import { Package_status } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Location, Package } from '../../../../(controller)';
import {
	TransitionLog,
	Package as TypePackage,
	getFormattedDate,
} from '@/src/util';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_id = Number(searchParams.get('location_id'));
	const data = await Location.getTransitionLog(location_id);
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
	const data = (await request.json()) as TypePackage;

	const newPackage = await Package.createNewPackage(data);
	if (!newPackage) {
		return NextResponse.json({
			status: 500,
			newPackage,
		});
	}
	return NextResponse.json({
		status: 200,
		newPackage,
	});
};
const PATCH = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const package_id = searchParams.get('package_id');
	const package_status = searchParams.get('package_status') as Package_status;
	const data = await Package.updatePackageState(
		Number(package_id),
		package_status
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
export { GET, POST, PATCH };
