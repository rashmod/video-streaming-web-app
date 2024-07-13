import transcodeVideo from '../services/transcodeVideo';
import DownloadService from '../services/download.service';
import FileService from '../services/file.service';

import getVideoResolution from '../utilities/getVideoResolution';

import { TRANSCODE_DIRECTORY, VARIANTS } from '../constants/constants';

export default async function transcodeProcessor(
	str: string | undefined,
	resumeConsumer: () => void
) {
	if (!str) return;
	console.log('transcoding...', str);

	const videoId: string = str;

	// videoId is from db
	// videoName is the filename in s3

	// todo get videoName from db
	const videoName = videoId;

	const downloadedFilePath = await FileService.generateDownloadFilePath(
		videoName
	);

	await DownloadService.downloadFile({
		videoName: videoId,
		destinationPath: downloadedFilePath,
	});
	console.log('downloaded in chunks...');

	const resolution = await getVideoResolution(downloadedFilePath);
	console.log('Resolution:', resolution);

	const transcodedPromises: Promise<unknown>[] = [];

	VARIANTS.forEach(async (variant) => {
		const { fileName: outputFileName, path: outputFilePath } =
			await FileService.generateTranscodeFilePath({
				videoName,
				variant: variant.name,
			});

		transcodedPromises.push(
			transcodeVideo({
				inputFilePath: downloadedFilePath,
				outputFileName,
				outputFilePath,
				variant,
			})
		);
	});

	await FileService.generateMasterPlaylist(videoName, VARIANTS);

	await Promise.all(transcodedPromises);

	const videos = await FileService.getFilesPath(TRANSCODE_DIRECTORY);

	await uploadAllFilesToS3(videos);

	const transcodedVideoDirectory =
		FileService.getTranscodedVideoDirectory(videoName);
	await FileService.deleteDirectory(transcodedVideoDirectory);
	await FileService.deleteFile(downloadedFilePath);

	resumeConsumer();
}
