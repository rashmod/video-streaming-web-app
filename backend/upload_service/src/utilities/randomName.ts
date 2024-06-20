import crypto from 'crypto';

export default function randomName(bytes = 32) {
	return Date.now().toString() + crypto.randomBytes(bytes).toString('hex');
}
