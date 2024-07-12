import { Request, Response } from 'express';

import envConfig from '../config/env.config';
import KafkaProducer from '../kafka/Kafka';
import S3Service from '../services/s3.service';

const kafkaProducer = new KafkaProducer(envConfig.KAFKA_CLIENT_ID);

export default async function completeUploadController(
	req: Request,
	res: Response
) {
	const {
		uploadId,
		videoId,
		parts,
	}: {
		uploadId: string;
		videoId: string;
		parts: { ETag: string; PartNumber: number }[];
	} = req.body;

	await S3Service.completeMultipartUpload({
		uploadId,
		parts,
		fileKey: videoId,
	});

	await kafkaProducer.connect();
	await kafkaProducer.produce('transcode', {
		bucket: envConfig.AWS_S3_BUCKET_NAME,
		videoId,
	});
	await kafkaProducer.disconnect();

	res.status(200).json({ message: 'Video successfully uploaded' });
}
