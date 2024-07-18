import ffmpeg from 'fluent-ffmpeg';

import FileService from './file.service';
import TranscodingProgressService from './transcodingProgress.service';
import {
	Resolution,
	TranscodingProgressId,
	TranscodingProgressStatus,
} from '../types/types';

export default class TranscodeService {
	static async transcodeVariants({
		videoName,
		inputFilePath,
		variants,
	}: TranscodeVariants) {
		function updateTranscoding(status: TranscodingProgressStatus) {
			return async function ({
				videoId,
				resolutionId,
			}: TranscodingProgressId) {
				await TranscodingProgressService.update({
					videoId,
					resolutionId,
					status,
				});
			};
		}

		const transcodedPromises: Promise<unknown>[] = [];

		for (const variant of variants) {
			const { fileName: outputFileName, path: outputFilePath } =
				await FileService.generateTranscodeFilePath({
					videoName,
					variant: variant.name,
				});

			transcodedPromises.push(
				this.transcodeVideo({
					inputFilePath,
					outputFileName,
					outputFilePath,
					variant,
					onTranscodingStart: updateTranscoding('IN_PROGRESS'),
					onTranscodingEnd: updateTranscoding('COMPLETED'),
				})
			);
		}

		await Promise.all(transcodedPromises);
		await FileService.generateMasterPlaylist(videoName, variants);
	}

	private static async transcodeVideo({
		inputFilePath,
		outputFileName,
		outputFilePath,
		variant,
		hlsTime = 10,
		onTranscodingStart,
		onTranscodingEnd,
	}: TranscodeVideo) {
		return new Promise((resolve, reject) => {
			ffmpeg(inputFilePath)
				.outputOptions([
					'-profile:v baseline',
					'-level 3.0',
					'-c:v h264',
					`-b:v ${variant.videoBitrate}`,
					'-c:a aac',
					`-b:a ${variant.audioBitrate}`,
					`-s ${variant.width}x${variant.height}`,
					'-start_number 0',
					`-hls_time ${hlsTime}`,
					'-hls_list_size 0',
					'-f hls',
				])
				.output(outputFilePath)
				.on('start', () => {
					console.log(`Started transcoding ${outputFileName}`);
					console.log(`resolution: ${variant.name}`);
					onTranscodingStart({
						videoId: variant.videoId,
						resolutionId: variant.resolutionId,
					});
				})
				.on('end', async () => {
					console.log(`Conversion completed for ${outputFileName}`);
					console.log(`resolution: ${variant.name}`);
					await onTranscodingEnd({
						videoId: variant.videoId,
						resolutionId: variant.resolutionId,
					});
					resolve(true);
				})
				.on('error', (err) => {
					console.log('Error during transcoding:', err);
					reject(false);
				})
				.run();
		});
	}
}

type TranscodeVariants = {
	videoName: string;
	inputFilePath: string;
	variants: (Resolution & TranscodingProgressId)[];
};

type TranscodeVideo = Pick<TranscodeVariants, 'inputFilePath'> & {
	onTranscodingStart: (data: TranscodingProgressId) => Promise<void>;
	onTranscodingEnd: (data: TranscodingProgressId) => Promise<void>;
	variant: ExtractElement<TranscodeVariants, 'variants'>;
	outputFileName: string;
	outputFilePath: string;
	hlsTime?: number;
};

type ExtractElement<T, S extends keyof T> = T[S] extends (infer V)[]
	? V
	: never;
