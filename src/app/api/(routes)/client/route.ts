import { PackageServices, PostServices } from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const GET = async (request: NextRequest) => {
	// const requestBody = await request.json();
	// const {id} = requestBody;
	// const data = await PackageServices.getPackageStatus(1);
	// if (data == null) {
	// 	return NextResponse.json({
	// 		status: 400,
	// 		data: null,
	// 	});
	// }
	// return NextResponse.json({
	// 	status: 200,
	// 	data: data
	// })
	const { searchParams } = new URL(request.url);
	const data = await PostServices.getPost();
	if (data != null) {
		return NextResponse.json({
			data: data,
			status: 200,
		});
	}
	return NextResponse.json({
		data: null,
		status: 400,
	});
};

export { GET };
