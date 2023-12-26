import { NextRequest, NextResponse } from 'next/server';
import { Package } from '@/src/app/api/(controller)'

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const package_id = searchParams.get('package_id');
	const data = await Package.getPackage(Number(package_id));
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
