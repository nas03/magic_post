import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
declare module 'next-auth' {
	interface Session {
		user: {
			role: string;
			post_id: number;
		} & DefaultSession;
	}

	interface User extends DefaultUser {
		role: string;
		post_id: number;
	}
}
declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role: string;
		post_id: number;
	}
}
