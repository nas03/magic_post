import CredentialsProvider from 'next-auth/providers/credentials';
import { UserServices } from '../../../../lib/prisma';
import { AuthOptions } from 'next-auth';

const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			authorize: async (credentials: Record<string, string>) => {
				const { email, password } = credentials;
				const user = await UserServices.getUserByEmail(email);

				if (user !== null) {
					Promise.resolve(user[0]);
				}
				return null;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			console.log('jwt token', token);
			if (user) {
				token.role = user.role;
				token.name = user.full_name;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.role = token.role;
			return session;
		},
	},
	pages: {
		signIn: '/pages/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;

export { authOptions };
