import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { UserServices } from '../../../../prisma';
import { stringify } from 'querystring';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},

			async authorize(credentials) {
				try {
					const { email, password } = credentials;
					const user = await UserServices.getUserByEmail(email);
					if (user != null) {
						const validate = bcrypt.compare(password, user[0].password);
						if (validate) {
							return user;
						}
					}
					return (
						JSON,
						stringify({
							ok: false,
							status: 200,
							error:
								'The email address and/or password you specified are not correct.',
							url: null,
						})
					);
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
	pages: {
		signIn: '/pages/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
