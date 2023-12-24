import { NextRequest, NextResponse } from 'next/server';
import { Package } from '../../(controller)';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search');
	const id = searchParams.get('id');
	let data;
	if (search == 'status') {
		data = await Package.getPackageStatus(Number(id));
	} else if (search == 'package') {
		data = await Package.getPackage(Number(id));
	}
	if (data == null) {
		return NextResponse.json({
			status: 400,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data: data,
	});
};

export { GET };
