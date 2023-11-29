import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { UserServices } from '../../../../prisma';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},

			async authorize(credentials) {
				const { email, password } = credentials;

				try {
					const user = await UserServices.getUserByEmail(email);
					const { password } = user[0];
					const res = {
						ok: true,
						status: 200,
						error: null,
						url: '/pages/adminPage',
					};
					return JSON.stringify(res);
				} catch (error) {
					console.log('Error: ', error);
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},
	callbacks: {
		async jwt(token, user, account, profile, isNewUser) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session(session, user) {
			session.user = user;
			return session;
		},
		async redirect(url, baseUrl) {
			return baseUrl;
		},
		async error(error, req, res) {
			console.error('NextAuth.js error:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		},
	},
	pages: {
		signIn: '/pages/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
