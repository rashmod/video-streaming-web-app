import ffmpeg, { type FfprobeData } from 'fluent-ffmpeg';
import { promisify } from 'util';

export default async function getVideoResolution(filePath: string) {
	const ffprobe: (arg1: string) => Promise<FfprobeData> = promisify(
		ffmpeg.ffprobe
	);

	const metadata = await ffprobe(filePath);

	const videoStream = metadata.streams.find(
		(stream) => stream.codec_type === 'video'
	);

	if (!videoStream) throw new Error('No video stream found');
	return {
		width: videoStream.width,
		height: videoStream.height,
	};
}
