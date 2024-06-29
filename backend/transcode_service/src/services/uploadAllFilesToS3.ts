import fs from 'fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import envConfig from '../config/env.config';
import s3Client from '../config/s3.config';

type Video = {
	original: string;
	relative: string;
};

export default async function uploadAllFilesToS3(videos: Video[]) {
	const uploadVideoPromises = videos.map((video) => uploadFileToS3(video));

	await Promise.all(uploadVideoPromises);
}

async function uploadFileToS3(video: Video) {
	const fileContent = fs.readFileSync(video.original);
	const command = new PutObjectCommand({
		Bucket: envConfig.AWS_BUCKET_NAME,
		Key: video.relative,
		Body: fileContent,
	});

	return s3Client.send(command);
}
