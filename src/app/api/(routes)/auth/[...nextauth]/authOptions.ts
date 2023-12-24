import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import { User } from '../../../(controller)';

const authorizeCredentials = async (credentials: Record<string, string>) => {
	const { email, password } = credentials;
	const data = await User.getUserByEmail(email);
	const user = data[0];
	const post_id = user.post_id;
	if (user) {
		return {
			id: user.uuid,
			name: user.full_name,
			email: user.email,
			role: user.role,
			post_id: post_id,
		};
	}

	return null;
};

const jwtCallback = ({ token, user }) => {
	if (user) {
		token.role = user.role;
		token.post_id = user.post_id;
	}

	return token;
};

const sessionCallback = ({ session, token }) => {
	console.log('Session token: ', token);

	if (token) {
		session.user.role = token.role;
		session.user.post_id = token.post_id;
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
