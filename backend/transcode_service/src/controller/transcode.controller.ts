import ffmpeg from 'fluent-ffmpeg';

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

	ffmpeg.ffprobe(filePath, (err, metadata) => {
		if (err) {
			console.log(err);
		} else {
			console.log(JSON.stringify(metadata, null, 2));

			const videoStream = metadata.streams.find(
				(stream) => stream.codec_type === 'video'
			);

			if (videoStream) {
				const resolution = {
					width: videoStream.width,
					height: videoStream.height,
				};

				console.log('----------------------------------');
				console.log('----------------------------------');
				console.log('----------------------------------');
				console.log('Resolution:', resolution);
			} else {
				console.log('No video stream found');
			}
		}
	});
}
