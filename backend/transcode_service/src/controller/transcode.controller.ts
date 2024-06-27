import ffmpeg, { type FfprobeData } from 'fluent-ffmpeg';
import { promisify } from 'util';

import downloadInChunks from '../services/downloadInChunks';
import generateFilePath from '../utilities/generateFilePath';

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

	const ffprobe: (arg1: string) => Promise<FfprobeData> = promisify(
		ffmpeg.ffprobe
	);

	const metadata = await ffprobe(filePath);

	const videoStream = metadata.streams.find(
		(stream) => stream.codec_type === 'video'
	);
	if (!videoStream) throw new Error('No video stream found');

	const resolution = {
		width: videoStream.width,
		height: videoStream.height,
	};

	console.log('Resolution:', resolution);

	const VARIANTS = [
		{ width: 1920, height: 1080, name: '1080p' },
		{ width: 1280, height: 720, name: '720p' },
		{ width: 854, height: 480, name: '480p' },
		// { width: 640, height: 360, name: '360p' },
		// { width: 426, height: 240, name: '240p' },
		// { width: 320, height: 180, name: '180p' },
	];

	VARIANTS.forEach((variant) => {
		const outputFileName = `output-${variant.name}.m3u8`;
		const outputFilePath = generateFilePath(outputFileName, 'output');

		ffmpeg(filePath)
			.outputOptions([
				'-profile:v baseline',
				'-level 3.0',
				`-s ${variant.width}x${variant.height}`,
				'-start_number 0',
				'-hls_time 10',
				'-hls_list_size 0',
				'-f hls',
			])
			.output(outputFilePath)
			.on('end', () => {
				console.log(`Conversion completed for ${outputFileName}`);
			})
			.on('error', (err) => {
				console.log('Error during transcoding:', err);
			})
			.run();
	});
}
