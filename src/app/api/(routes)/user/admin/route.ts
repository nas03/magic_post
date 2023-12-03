import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/src/app/api/(controller)';
import { UserServices } from '@/src/lib/prisma';
const POST = async (request: NextRequest) => {};
export async function DELETE() {
	try {
		const deleteUser = await UserServices.deleteUser(
			'sonanhnguyen003@gmail.com'
		);
		return NextResponse.json({
			status: 200,
			success: true,
			deleteUser,
		});
	} catch (error) {
		console.error(`Error deleting user with email`);
		return NextResponse.json({
			error: 'Internal Server Error',
			status: 500,
		});
	}
}
const GET = async (request: NextRequest) => {};
