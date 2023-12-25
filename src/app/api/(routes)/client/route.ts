import { NextRequest, NextResponse } from 'next/server';
import { Location, Package } from '../../(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const package_id = Number(searchParams.get('package_id'));
	const data = await Package.getPackageTransitionLog(package_id);
	if (!data) {
		return NextResponse.json({
			status: 400,
			data,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};

export { GET };
