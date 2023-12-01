import CredentialsProvider from 'next-auth/providers/credentials';
import { UserServices } from '../../../../lib/prisma';

const authOptions = {
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
						return user[0];
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

export {authOptions}