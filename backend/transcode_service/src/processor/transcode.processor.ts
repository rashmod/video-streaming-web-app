import TranscodeService from '../services/transcode.service';
import DownloadService from '../services/download.service';
import S3Service from '../services/s3.service';
import FileService from '../services/file.service';

import { TRANSCODE_DIRECTORY, VARIANTS } from '../constants/constants';

export default async function transcodeProcessor(
	str: string,
	resumeConsumer: () => void
) {
	console.log('transcoding...', str);

	const videoId: string = str;

	//#region
	// videoId is from db
	// videoName is the filename in s3

	// the video name stored in video table is the generated name with original extension
	// the output name is the name with .m3u8 extension
	// to delete the file from s3 we need the original extension
	// todo get videoName from db
	//#endregion
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
