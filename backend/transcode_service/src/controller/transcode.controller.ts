import ffmpeg, { FfprobeData } from 'fluent-ffmpeg';
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

	const filePath = generateFilePath(videoName);

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
}
