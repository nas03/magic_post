import CredentialsProvider from 'next-auth/providers/credentials';
import { UserServices } from '../../../../lib/prisma';
import { AuthOptions } from 'next-auth';
const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			authorize: async (credentials: Record<string, string>) => {
				try {
					const { email, password } = credentials;
					const user = await UserServices.getUserByEmail(email);

					if (user !== null) {
						return {
							id: user[0].user_id,
							email: user[0].email,
							full_name: user[0].full_name,
							password: user[0].password,
							location_id: user[0].location_id,
							role: user[0].role,
						};
					} else {
						return null;
					}
				} catch (error) {
					console.log('Error: ', error);
					return null;
				}
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
};

export { authOptions };
