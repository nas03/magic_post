import CredentialsProvider from 'next-auth/providers/credentials';
import { UserServices } from '../../../../../lib/prisma';
import { AuthOptions } from 'next-auth';

const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			authorize: async (credentials: Record<string, string>) => {
				const { email, password } = credentials;
				console.log('email auth', email);
				const user = await UserServices.getUserByEmail(email);
				console.log(user);
				if (user !== null) {
					return Promise.resolve({
						id: user[0].user_id.toString,
						name: user[0].full_name,
						email: user[0].email,
						role: user[0].role,
					});
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
			if (user) {
				token.role = user.role;
			}
			console.log(token);
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.role = token.role;
			}
			return session;
		},
	},
	pages: {
		signIn: '/pages/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;

export { authOptions };
