import { NextRequest, NextResponse } from 'next/server';
import { UserController, LocationController } from '@/src/app/api/(controller)';
import { env } from 'process';
import { getToken } from 'next-auth/jwt';
import nextAuth from 'next-auth';
import { Location_type } from '@prisma/client';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_type = searchParams.get('location_type') as Location_type;
	console.log(location_type);
	const data = await LocationController.getLocationWithType(location_type);
	if (!data) {
		return NextResponse.json({
			status: 500,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data: data,
	});
};
const POST = async (request: NextRequest) => {};
const PATCH = async (request: NextRequest) => {
	const { id, location, name, type } = await request.json();
	const data = await LocationController.updateLocation(
		Number(id),
		location,
		name,
		type
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
const DELETE = async (request: NextRequest) => {};

export { GET, POST, DELETE, PATCH };
