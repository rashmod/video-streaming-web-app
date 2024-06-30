import asyncFs from 'fs/promises';

export default async function deleteDirectory(path: string) {
	await asyncFs.rm(path, { recursive: true, force: true });
}
