import { Request, Response } from 'express';

import envConfig from '../config/env.config';
import KafkaProducer from '../kafka/Kafka';
import UploadService from '../services/upload.service';

const kafkaProducer = new KafkaProducer(envConfig.KAFKA_CLIENT_ID);

let count = 0;

export default async function completeUploadController(
	req: Request,
	res: Response
) {
	console.log('upload complete...');

	const {
		videoId,
		parts,
	}: { videoId: string; parts: { ETag: string; PartNumber: number }[] } =
		req.body;

	await UploadService.completeUpload({ parts, videoId });

	console.log(`uploaded video: ${++count}`);
	await kafkaProducer.connect();
	await kafkaProducer.produce('transcode', {
		bucket: envConfig.AWS_S3_BUCKET_NAME,
		videoId,
	});
	await kafkaProducer.disconnect();

	res.status(200).json({ success: true, videoId });
}
