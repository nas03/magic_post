import CredentialsProvider from 'next-auth/providers/credentials';
import { UserServices } from '../../../../../lib/prisma';
import { AuthOptions } from 'next-auth';

const authorizeCredentials = async (credentials: Record<string, string>) => {
	const { email, password } = credentials;
	console.log('email auth', email);
	const data = await UserServices.getUserByEmail('sonanhnguyen003@gmail.com');
	const user = data[0];

	if (user !== null) {
		console.log('user', user);
		return {
			id: user.uuid,
			name: user.full_name,
			email: user.email,
			role: user.role,
		};
	}

	return null;
};

const jwtCallback = ({ token, user }) => {
	if (user) {
		token.role = user.role;
	}
	console.log('NextAuth token: ', token);
	return token;
};

const sessionCallback = ({ session, token }) => {
	if (token) {
		session.user.role = token.role;
	}
	return session;
};

const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			authorize: authorizeCredentials,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		jwt: jwtCallback,
		session: sessionCallback,
	},
	pages: {
		signIn: '/pages/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
