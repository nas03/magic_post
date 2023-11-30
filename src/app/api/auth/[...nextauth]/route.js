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
			authorize: async (credentials) => {
				try {
					const { email, password } = credentials;
					const user = await UserServices.getUserByEmail(email);
					if (user != null) {
						//const validate = await bcrypt.compare(password, user[0].password);
						//if (validate) {
						//console.log('user', user[0]);
						return user[0]
						//}
					} else {
						return null;
					}
				} catch (error) {
					console.log('Error: ', error);
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
				token.name = user.full_name
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
