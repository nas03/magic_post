import { NextRequest, NextResponse } from 'next/server';
import {
	PackageController,
	LocationController,
} from '@/src/app/api/(controller)';
import { TransshipmentLog, ShipmentLog, Package } from '@/src/util';
import { Package_status } from '@prisma/client';
const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_id = Number(searchParams.get('location_id'));
	const task = searchParams.get('task');

	const data =
		task == 'received'
			? await PackageController.getPackageReceivedBranch(location_id)
			: await PackageController.getPendingPackage(location_id);
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
const POST = async (request: NextRequest) => {
	const data = (await request.json()) as Package;

	const newPackage = await PackageController.createNewPackage(data);
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
	const { package_id, package_status } = await request.json();

	const data = await PackageController.updatePackageState(
		Number(package_id),
		package_status as Package_status
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

const DELETE = async (request: NextRequest) => {};
export { GET, DELETE, POST, PATCH };
