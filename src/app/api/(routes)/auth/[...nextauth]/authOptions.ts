import { signIn } from 'next-auth/react';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import { UserController } from '@/src/app/api/(controller)';

const authorizeCredentials = async (credentials: Record<string, string>) => {
	const { email, password } = credentials;
	const data = await UserController.getUserByEmail(email);
	const user = data[0];
	if (user) {
		return {
			id: user.id.toString(),
			name: user.fullName,
			email: user.email,
			role: user.role,
			location_id: user.location_id,
		};
	}

	return null;
};

const jwtCallback = ({ token, user }) => {
	if (user) {
		token.role = user.role;
		token.location_id = user.location_id;
	}

	return token;
};

const sessionCallback = ({ session, token }) => {
	if (token) {
		session.user.role = token.role;
		session.user.location_id = token.location_id;
	}
	console.log('session', session);
	return session;
};
// const signInCallBack = ({ user, account, profile, email, credentials }) => {
// 	return user;
// };
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
		// signIn: signInCallBack,
	},
	pages: {
		signIn: '/pages/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
