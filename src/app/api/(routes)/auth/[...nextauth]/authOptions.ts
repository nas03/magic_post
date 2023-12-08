
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserServices } from '../../../../../lib/prisma';
import { AuthOptions } from 'next-auth';

const authorizeCredentials = async (credentials: Record<string, string>) => {
	const { email, password } = credentials;
	const data = await UserServices.getUserByEmail(email);
	const user = data[0];
	console.log('data', data);
	if (user !== null) {

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
	
	return token;
};

const sessionCallback = ({ session, token }) => {
	console.log('Session token: ', token);

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
