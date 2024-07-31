import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

export default class AuthService {
	static hashPassword(password: string) {
		return bcrypt.hashSync(password, 10);
	}

	static comparePassword(password: string, hash: string) {
		return bcrypt.compareSync(password, hash);
	}

	static signToken(payload: string, tokenType: 'access' | 'refresh') {
		if (tokenType === 'refresh') {
			return sign(payload, 'refresh secret', { expiresIn: '7d' });
		} else {
			return sign(payload, 'access secret', { expiresIn: '15m' });
		}
	}

	static verifyToken(
		token: string | undefined,
		tokenType: 'access' | 'refresh'
	) {
		if (!token) return false;
		if (tokenType === 'refresh') {
			return verify(token, 'refresh secret');
		} else {
			return verify(token, 'access secret');
		}
	}
}
