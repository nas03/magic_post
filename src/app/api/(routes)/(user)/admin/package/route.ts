import { NextRequest, NextResponse } from 'next/server';
import { LocationController } from '@/src/app/api/(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_id = searchParams.get('location_id');
	const data = await LocationController.getTransshipmentStatistics(
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
const POST = async (request: NextRequest) => {};

const DELETE = async (request: NextRequest) => {};
export { GET, DELETE, POST };
