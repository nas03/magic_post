import { PackageServices, PostServices } from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search')
	const id = searchParams.get('id');
	let data;
	if(search == 'status') {
		 data = await PackageServices.getPackageStatus(Number(id));
	}
	else if (search == 'package') {
		data = await PackageServices.getPackageWithID(Number(id))
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
