import fs from 'fs';
import path from 'path';

export default function generateFilePath(videoName: string) {
	const inputDir = './input/';
	if (!fs.existsSync(inputDir)) {
		fs.mkdirSync(inputDir);
	}

	const filePath = path.join(inputDir, videoName);
	return filePath;
}
