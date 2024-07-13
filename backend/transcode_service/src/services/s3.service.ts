import { GetObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../config/s3.config';
import envConfig from '../config/env.config';

export default class S3Service {
	static async getObjectInRange({
		fileKey,
		start,
		end,
	}: {
		fileKey: string;
		start: number;
		end: number;
	}) {
		const command = new GetObjectCommand({
			Bucket: envConfig.AWS_BUCKET_NAME,
			Key: fileKey,
			Range: `bytes=${start}-${end}`,
		});

		const { ContentRange, Body } = await s3Client.send(command);

		return { ContentRange, fileContent: Body?.transformToByteArray() };
	}

	static parseRangeAndLength(contentRange: string) {
		const [range, length] = contentRange.split(' ')[1].split('/');
		const [start, end] = range.split('-');
		return {
			start: parseInt(start),
			end: parseInt(end),
			length: parseInt(length),
		};
	}
}
