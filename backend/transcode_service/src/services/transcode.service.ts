import { promisify } from 'util';
import ffmpeg, { type FfprobeData } from 'fluent-ffmpeg';

import FileService from './file.service';

const ffprobe = promisify(ffmpeg.ffprobe);

export default class TranscodeService {
	static async transcodeVariants({
		videoName,
		inputFilePath,
		variants,
	}: {
		videoName: string;
		inputFilePath: string;
		variants: Variant[];
	}) {
		const resolution = await this.getVideoResolution(inputFilePath);

		const transcodedPromises: Promise<unknown>[] = [];

		variants.forEach(async (variant) => {
			if (
				variant.width > resolution.width ||
				variant.height > resolution.height
			)
				return;

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
				})
			);
		});

		await Promise.all(transcodedPromises);
		await FileService.generateMasterPlaylist(videoName, variants);
	}

	static async getVideoDuration(filePath: string) {
		const metadata = (await ffprobe(filePath)) as FfprobeData;

		if (!metadata.format.duration)
			throw new Error('No video duration found');

		return metadata.format.duration;
	}

	private static async getVideoResolution(filePath: string) {
		const metadata = (await ffprobe(filePath)) as FfprobeData;

		const videoStream = metadata.streams.find(
			(stream) => stream.codec_type === 'video'
		);

		if (!videoStream) throw new Error('No video stream found');
		if (!videoStream.width) throw new Error('No video width found');
		if (!videoStream.height) throw new Error('No video height found');

		return {
			width: videoStream.width,
			height: videoStream.height,
		};
	}

	private static async transcodeVideo({
		inputFilePath,
		outputFileName,
		outputFilePath,
		variant,
		hlsTime = 10,
	}: TranscodeRequest) {
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
				})
				.on('end', () => {
					console.log(`Conversion completed for ${outputFileName}`);
					console.log(`resolution: ${variant.name}`);
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

export type Variant = {
	width: number;
	height: number;
	videoBitrate: string;
	audioBitrate: string;
	name: string;
};

type TranscodeRequest = {
	inputFilePath: string;
	outputFileName: string;
	outputFilePath: string;
	variant: Variant;
	hlsTime?: number;
};
