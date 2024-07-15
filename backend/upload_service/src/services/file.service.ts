import asyncFs from 'fs/promises';
import crypto from 'crypto';

export default class FileService {
	static async ensureDirectoryExists(directoryPath: string) {
		await asyncFs.mkdir(directoryPath, { recursive: true });
	}

	static randomName(bytes = 32) {
		return (
			Date.now().toString() + crypto.randomBytes(bytes).toString('hex')
		);
	}
}
