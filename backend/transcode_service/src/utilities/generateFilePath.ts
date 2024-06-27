import fs from 'fs';
import path from 'path';

type GenerateInputPath = { dir: 'input' };
type GenerateOutputPath = { dir: 'output'; variant: string };
type GenerateFilePath = { videoName: string } & (
	| GenerateInputPath
	| GenerateOutputPath
);

export default function generateFilePath(arg: GenerateFilePath) {
	const inputDir = `./${arg.dir}/`;
	if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir);

	if (arg.dir === 'input') return path.join(inputDir, arg.videoName);

	const variantDir = path.join(inputDir, arg.variant);
	if (!fs.existsSync(variantDir)) fs.mkdirSync(variantDir);

	return path.join(variantDir, arg.videoName);
}
