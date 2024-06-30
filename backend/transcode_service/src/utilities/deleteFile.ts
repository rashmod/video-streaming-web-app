import asyncFs from 'fs/promises';

export default async function deleteFile(filePath: string) {
	await asyncFs.access(filePath);
	await asyncFs.unlink(filePath);
}
