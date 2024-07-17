import TranscodeService from '../services/transcode.service';
import DownloadService from '../services/download.service';
import S3Service from '../services/s3.service';
import FileService from '../services/file.service';

import { TRANSCODE_DIRECTORY, VARIANTS } from '../constants/constants';

export default async function transcodeProcessor(
	videoId: string,
	resumeConsumer: () => void
) {


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

	// todo save the transcoded files with a prefix video
	// todo save the original files with a prefix original
	// todo save the thumbnails with a prefix thumbnail
	await S3Service.uploadFiles(videos);

	const transcodedVideoDirectory =
		FileService.getTranscodedVideoDirectory(videoName);
	await FileService.deleteDirectory(transcodedVideoDirectory);
	await FileService.deleteFile(downloadedFilePath);

	resumeConsumer();
}
