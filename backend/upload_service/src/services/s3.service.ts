import {
	CompleteMultipartUploadCommand,
	CreateMultipartUploadCommand,
	PutObjectCommand,
	UploadPartCommand,
} from '@aws-sdk/client-s3';

import envConfig from '../config/env.config';
import s3Client from '../config/s3.config';
import { InternalServerError } from '../errors';

export default class S3Service {
	static async uploadImage(file: Buffer, fileKey: string) {
		const command = new PutObjectCommand({
			Bucket: envConfig.AWS_S3_BUCKET_NAME,
			Key: fileKey,
			Body: file,
		});

		// todo check if upload is successful
		await s3Client.send(command);
	}

	static async initializeMultipartUpload(fileKey: string) {
		const command = new CreateMultipartUploadCommand({
			Bucket: envConfig.AWS_S3_BUCKET_NAME,
			Key: fileKey,
		});

		const multipartUpload = await s3Client.send(command);

		if (!multipartUpload.UploadId) {
			throw new InternalServerError(
				'Failed to initialize multipart upload.'
			);
		}

		return multipartUpload.UploadId;
	}

	static async uploadPart({
		part,
		uploadId,
		partNumber,
		fileKey,
	}: {
		part: Buffer;
		uploadId: string;
		partNumber: number;
		fileKey: string;
	}) {
		const command = new UploadPartCommand({
			Bucket: envConfig.AWS_S3_BUCKET_NAME,
			Key: fileKey,
			UploadId: uploadId,
			PartNumber: partNumber,
			Body: part,
		});

		const result = await s3Client.send(command);

		if (!result.ETag) {
			throw new InternalServerError('Failed to upload part.');
		}

		return result.ETag;
	}

	static async completeMultipartUpload({
		uploadId,
		parts,
		fileKey,
	}: {
		uploadId: string;
		parts: { ETag: string; PartNumber: number }[];
		fileKey: string;
	}) {
		const command = new CompleteMultipartUploadCommand({
			Bucket: envConfig.AWS_S3_BUCKET_NAME,
			Key: fileKey,
			UploadId: uploadId,
			MultipartUpload: {
				Parts: parts,
			},
		});

		// todo check if upload is successful
		await s3Client.send(command);
	}
}
