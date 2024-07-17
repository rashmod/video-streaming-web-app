import TranscodeService from '../services/transcode.service';
import DownloadService from '../services/download.service';
import S3Service from '../services/s3.service';
import FileService from '../services/file.service';
import VideoService from '../services/video.service';
import UploadProgressService from '../services/uploadProgress.service';
import TranscodingProgressService from '../services/transcodingProgress.service';

import { TRANSCODE_DIRECTORY } from '../constants/constants';

export default async function transcodeProcessor(
	videoId: string,
	resumeConsumer: () => void
) {
	const { videoName: transcodeKey } = await VideoService.findById(videoId);
	const { uploadKey } = await UploadProgressService.findById(videoId);
	const transcodingProgress =
		await TranscodingProgressService.findAllByVideoId(videoId);

	const variants = transcodingProgress.map((item) => item.resolution);

	const transcodeKeyBase = FileService.getS3FileName({
		fileName: transcodeKey,
		type: 'base',
	});
	const uploadKeyBase = FileService.getS3FileName({
		fileName: uploadKey,
		type: 'base',
	});

	const downloadedFilePath = await FileService.generateDownloadFilePath(
		uploadKeyBase
	);

	await DownloadService.downloadFile({
		videoName: uploadKey,
		destinationPath: downloadedFilePath,
	});

	await TranscodeService.transcodeVariants({
		videoName: transcodeKeyBase,
		inputFilePath: downloadedFilePath,
		variants: variants,
	});

	const videos = await FileService.getFilesPath(
		TRANSCODE_DIRECTORY,
		transcodeKeyBase
	);

	await S3Service.uploadFiles(videos);

	const transcodedVideoDirectory =
		FileService.getTranscodedVideoDirectory(transcodeKeyBase);
	await FileService.deleteDirectory(transcodedVideoDirectory);
	await FileService.deleteFile(downloadedFilePath);

	await S3Service.deleteFile(uploadKey);

	resumeConsumer();
}
