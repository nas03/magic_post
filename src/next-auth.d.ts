import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
declare module 'next-auth' {
	interface Session {
		user: {
			role: string;
			location_id: number;
		} & DefaultSession;
	}

	interface User extends DefaultUser {
		role: string;
		location_id: number;
	}
}
declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role: string;
		location_id: number;
	}
}
