import { sign, verify } from 'jsonwebtoken';

import envConfig from '../config/env.config';

export default class AuthService {
	static verifyToken(token: string | undefined) {
		if (!token) return false;
		return verify(token, envConfig.JWT_ACCESS_TOKEN_SECRET);
	}
}
