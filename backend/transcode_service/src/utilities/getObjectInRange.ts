import { GetObjectCommand } from '@aws-sdk/client-s3';

import s3Client from '../config/s3.config';

export default async function getObjectInRange({
	bucket,
	key,
	start,
	end,
}: {
	bucket: string;
	key: string;
	start: number;
	end: number;
}) {
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: key,
		Range: `bytes=${start}-${end}`,
	});

	return s3Client.send(command);
}
