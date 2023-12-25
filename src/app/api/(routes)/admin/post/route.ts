import { NextRequest, NextResponse } from 'next/server';
import { Post, User } from '@/src/app/api/(controller)';
import { request } from 'http';
import { getToken } from 'next-auth/jwt';
import { env } from 'process';

const GET = async (request: NextRequest) => {
	// 'const token = await getToken();'
};
const POST = async (request: NextRequest) => {};
const PATCH = async (request: NextRequest) => {};
const DELETE = async (request: NextRequest) => {};

export { GET, POST, DELETE, PATCH };
