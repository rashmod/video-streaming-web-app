import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import envConfig from '../config/env.config';

export default class AuthService {
	static hashPassword(password: string) {
		return bcrypt.hashSync(password, 10);
	}

	static comparePassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}

	static signToken(payload: { id: string }, tokenType: 'access' | 'refresh') {
		if (tokenType === 'refresh') {
			return sign(payload, envConfig.JWT_REFRESH_TOKEN_SECRET, {
				expiresIn: envConfig.JWT_REFRESH_TOKEN_EXPIRY,
			});
		} else {
			return sign(payload, envConfig.JWT_ACCESS_TOKEN_SECRET, {
				expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRY,
			});
		}
	}

	static signTokens(payload: { id: string }) {
		return {
			accessToken: AuthService.signToken(payload, 'access'),
			refreshToken: AuthService.signToken(payload, 'refresh'),
		};
	}

	static verifyToken(
		token: string | undefined,
		tokenType: 'access' | 'refresh'
	) {
		if (!token) return false;
		if (tokenType === 'refresh') {
			return verify(token, envConfig.JWT_REFRESH_TOKEN_SECRET);
		} else {
			return verify(token, envConfig.JWT_ACCESS_TOKEN_SECRET);
		}
	}
}
