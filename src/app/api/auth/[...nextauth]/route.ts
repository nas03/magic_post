import NextAuth from 'next-auth/next';
import { authOptions } from './authOptions';
import { AuthOptions } from 'next-auth';
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
