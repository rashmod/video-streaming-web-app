import Ffmpeg from 'fluent-ffmpeg';

export default function transcodeVideo(
	inputFilePath: string,
	outputFileName: string,
	outputFilePath: string,
	variant: {
		width: number;
		height: number;
		name: string;
	},
	hlsTime = 10
) {
	Ffmpeg(inputFilePath)
		.outputOptions([
			'-profile:v baseline',
			'-level 3.0',
			`-s ${variant.width}x${variant.height}`,
			'-start_number 0',
			`-hls_time ${hlsTime}`,
			'-hls_list_size 0',
			'-f hls',
		])
		.output(outputFilePath)
		.on('end', () => {
			console.log(`Conversion completed for ${outputFileName}`);
		})
		.on('error', (err) => {
			console.log('Error during transcoding:', err);
		})
		.run();
}
