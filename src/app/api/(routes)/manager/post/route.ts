
import { NextRequest, NextResponse } from 'next/server';
import { Post } from '@/src/app/api/(controller)';
const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);
	const packageType = searchParams.get('type');
	const post_id = Number(searchParams.get('post-id'));
	const data =
		packageType === 'transported_package'
			? await Post.getTransportedPackageCount(post_id)
			: await Post.getReceivedPackageCount(post_id);
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
export {GET}