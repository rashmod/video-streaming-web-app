import fs from 'fs';
import path from 'path';

export default function getAllFilesPath(baseDir: string) {
	return getAllFiles(baseDir).map((file) => ({
		original: file,
		relative: path.relative(baseDir, file),
	}));
}

function getAllFiles(baseDir: string) {
	const results: string[] = [];

	fs.readdirSync(baseDir).forEach((file) => {
		const filePath = path.join(baseDir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			const nestedFiles = getAllFiles(filePath);
			results.push(...nestedFiles);
		} else {
			results.push(filePath);
		}
	});

	return results;
}
