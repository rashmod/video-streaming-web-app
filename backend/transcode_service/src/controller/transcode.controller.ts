import downloadInChunks from '../services/downloadInChunks';

import generateFilePath from '../utilities/generateFilePath';
import transcodeVideo from '../utilities/transcodeVideo';
import getVideoResolution from '../utilities/getVideoResolution';

import VARIANTS from '../constants/constants';

type TranscodeRequest = {
	bucket: string;
	videoId: string;
};

export default async function transcodeController(str: string | undefined) {
	if (!str) return;
	console.log('transcoding...', str);

	const { bucket, videoId }: TranscodeRequest = JSON.parse(str);

	// videoId is from db
	// videoName is the filename in s3

	// todo get videoName from db
	const videoName = videoId;

	const filePath = generateFilePath(videoName, 'input');

	await downloadInChunks(bucket, videoId, filePath);
	console.log('downloaded in chunks...');

	const resolution = await getVideoResolution(filePath);
	console.log('Resolution:', resolution);

	VARIANTS.forEach((variant) => {
		const outputFileName = `output-${variant.name}.m3u8`;
		const outputFilePath = generateFilePath(outputFileName, 'output');

		transcodeVideo(filePath, outputFileName, outputFilePath, variant);
	});
}
