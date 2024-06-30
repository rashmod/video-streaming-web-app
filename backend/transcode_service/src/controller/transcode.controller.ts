import path from 'path';

import downloadInChunks from '../services/downloadInChunks';
import transcodeVideo from '../services/transcodeVideo';
import uploadAllFilesToS3 from '../services/uploadAllFilesToS3';

import deleteFile from '../utilities/deleteFile';
import generateFilePath from '../utilities/generateFilePath';
import getVideoResolution from '../utilities/getVideoResolution';
import getAllFilesPath from '../utilities/getAllFilesPath';
import generateMasterPlaylist from '../utilities/generateMasterPlaylist';
import deleteDirectory from '../utilities/deleteDirectory';

import VARIANTS from '../constants/constants';

type TranscodeRequest = {
	bucket: string;
	videoId: string;
};

export default async function transcodeController(
	str: string | undefined,
	resumeConsumer: () => void
) {
	if (!str) return;
	console.log('transcoding...', str);

	const { bucket, videoId }: TranscodeRequest = JSON.parse(str);

	// videoId is from db
	// videoName is the filename in s3

	// todo get videoName from db
	const videoName = videoId;

	const inputFilePath = generateFilePath({ dir: 'input', videoName });

	await downloadInChunks(bucket, videoId, inputFilePath);
	console.log('downloaded in chunks...');

	const resolution = await getVideoResolution(inputFilePath);
	console.log('Resolution:', resolution);

	const transcodedPromises: Promise<unknown>[] = [];

	const cleanVideoName = videoName.replaceAll('.', '_');

	VARIANTS.forEach((variant) => {
		const outputFileName = `${cleanVideoName}_${variant.name}.m3u8`;
		const outputFilePath = generateFilePath({
			dir: 'output',
			outputFileName,
			videoName: cleanVideoName,
			variant: variant.name,
		});

		transcodedPromises.push(
			transcodeVideo({
				inputFilePath,
				outputFileName,
				outputFilePath,
				variant,
			})
		);
	});

	generateMasterPlaylist(cleanVideoName);

	await Promise.all(transcodedPromises);

	const baseDir = './output';
	const videos = getAllFilesPath(baseDir);

	await uploadAllFilesToS3(videos);

	const outputDir = path.join(baseDir, cleanVideoName);
	deleteDirectory(outputDir);
	deleteFile(inputFilePath);

	resumeConsumer();
}
