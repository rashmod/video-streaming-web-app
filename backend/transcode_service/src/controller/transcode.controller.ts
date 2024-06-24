import downloadInChunks from '../services/downloadInChunks';

type TranscodeRequest = {
	bucket: string;
	videoId: string;
};

export default async function transcodeController(str: string | undefined) {
	if (!str) return;
	console.log('transcoding...', str);

	const { bucket, videoId }: TranscodeRequest = JSON.parse(str);

	await downloadInChunks(bucket, videoId);
	console.log('downloaded in chunks...');
}
