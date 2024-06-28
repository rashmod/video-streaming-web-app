import fs from 'fs';
import path from 'path';

type GenerateInputPath = { dir: 'input' };
type GenerateOutputPath = {
	dir: 'output';
	variant: string;
	outputFileName: string;
};
type GenerateFilePath = { videoName: string } & (
	| GenerateInputPath
	| GenerateOutputPath
);

export default function generateFilePath(arg: GenerateFilePath) {
	const fileDir = `./${arg.dir}/`;
	if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);

	if (arg.dir === 'input') return path.join(fileDir, arg.videoName);

	const videoDir = path.join(fileDir, arg.videoName);
	if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir);

	const variantDir = path.join(videoDir, arg.variant);
	if (!fs.existsSync(variantDir)) fs.mkdirSync(variantDir);

	return path.join(variantDir, arg.outputFileName);
}
