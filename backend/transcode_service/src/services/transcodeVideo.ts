import Ffmpeg from 'fluent-ffmpeg';

type TranscodeRequest = {
	inputFilePath: string;
	outputFileName: string;
	outputFilePath: string;
	variant: {
		width: number;
		height: number;
		name: string;
		videoBitrate: string;
		audioBitrate: string;
	};
	hlsTime?: number;
};

export default function transcodeVideo({
	inputFilePath,
	outputFileName,
	outputFilePath,
	variant,
	hlsTime = 10,
}: TranscodeRequest) {
	return new Promise((resolve, reject) => {
		Ffmpeg(inputFilePath)
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
