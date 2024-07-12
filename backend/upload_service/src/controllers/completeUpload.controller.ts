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

	res.status(200).json({ success: true, videoId });
}
