import { readFileSync } from 'fs';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

import s3Client from '../config/s3.config';
import envConfig from '../config/env.config';

type Video = { path: string; fileKey: string };

export default class S3Service {
	static async uploadFiles(videos: Video[]) {
		const uploadVideoPromises = videos.map((video) =>
			this.uploadFile(video)
		);

		await Promise.all(uploadVideoPromises);
	}

	static async uploadFile({ path, fileKey }: Video) {
		const fileContent = readFileSync(path);
		const command = new PutObjectCommand({
			Bucket: envConfig.AWS_S3_BUCKET_NAME,
			Key: fileKey,
			Body: fileContent,
		});

		return s3Client.send(command);
	}

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
			Bucket: envConfig.AWS_S3_BUCKET_NAME,
			Key: fileKey,
			Range: `bytes=${start}-${end}`,
		});

		const { ContentRange, Body } = await s3Client.send(command);

		return { ContentRange, fileContent: Body?.transformToByteArray() };
	}

	static parseRangeAndLength(contentRange: string) {
		const [_, rangeAndLength] = contentRange.split(' ');
		if (!rangeAndLength) throw new Error('Range and length not found');

		const [range, length] = rangeAndLength.split('/');
		if (!range || !length) throw new Error('Range or length not found');

		const [start, end] = range.split('-');
		if (!start || !end) throw new Error('Start or end not found');

		return {
			start: parseInt(start),
			end: parseInt(end),
			length: parseInt(length),
		};
	}
}
