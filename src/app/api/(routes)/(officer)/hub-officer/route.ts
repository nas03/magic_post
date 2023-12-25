import { TransitionLog, getFormattedDate } from '@/src/util';
import { NextRequest, NextResponse } from 'next/server';
import { Location } from '../../../(controller)';

const POST = async (request: NextRequest) => {
	const logData = (await request.json()) as TransitionLog;
	//TODO: check if package sent to branch instead of hub
	const newTransitionLog = await Location.createNewTransitionLog(logData);
	if (!newTransitionLog) {
		return NextResponse.json({
			status: 400,

			newTransitionLog: null,
		});
	}
	return NextResponse.json({
		status: 200,
		newTransitionLog,
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
export { POST, PATCH };
