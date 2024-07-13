import TranscodeService from '../services/transcode.service';
import DownloadService from '../services/download.service';
import S3Service from '../services/s3.service';
import FileService from '../services/file.service';

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

	await TranscodeService.transcodeVariants({
		videoName,
		inputFilePath: downloadedFilePath,
		variants: VARIANTS,
	});

	const videos = await FileService.getFilesPath(TRANSCODE_DIRECTORY);

	await S3Service.uploadFiles(videos);

	const transcodedVideoDirectory =
		FileService.getTranscodedVideoDirectory(videoName);
	await FileService.deleteDirectory(transcodedVideoDirectory);
	await FileService.deleteFile(downloadedFilePath);

	resumeConsumer();
}
