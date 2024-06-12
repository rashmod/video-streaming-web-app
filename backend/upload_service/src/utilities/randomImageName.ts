import crypto from 'crypto';

export default function randomImageName(bytes = 32) {
	return Date.now().toString() + crypto.randomBytes(bytes).toString('hex');
}
