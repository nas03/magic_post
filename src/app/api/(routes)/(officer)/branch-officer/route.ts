import { ShipmentLog, TransitionLog, getFormattedDate } from '@/src/util';
import { NextRequest, NextResponse } from 'next/server';
import { Location } from '../../../(controller)';
const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const location_id = Number(searchParams.get('location_id'));

	const receiveData = await Location.getPackageStatusCount(
		'RECEIVED',
		location_id
	);
	const returnedData = await Location.getPackageStatusCount(
		'RETURNED',
		location_id
	);
	const data = {
		receiveData,
		returnedData,
	};
	if (!receiveData || !returnedData) {
		return NextResponse.json({
			status: 500,
			data: null,
		});
	}
	return NextResponse.json({
		status: 200,
		data,
	});
};
const POST = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const transition = searchParams.get('transition');
	let data = null;
	if (transition != null) {
		//TODO: check if package sent to branch instead of hub
		const logData = (await request.json()) as TransitionLog;
		data = await Location.createNewTransitionLog(logData);
	} else {
		const logData = (await request.json()) as ShipmentLog;
		data = await Location.createNewShipmentLog(logData);
	}
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
const PATCH = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const transhipment_id = searchParams.get('transhipment_id');
	const verified_date = searchParams.get('verified_date');
	const data = await Location.verifyPackageTransported(
		Number(transhipment_id),
		getFormattedDate(new Date(verified_date))
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
