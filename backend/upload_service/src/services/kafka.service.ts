import envConfig from '../config/env.config';
import KafkaProducer from '../kafka/Kafka';

export default class KafkaService {
	private static instance: KafkaService;
	private producer: KafkaProducer;

	constructor() {
		this.producer = new KafkaProducer(envConfig.KAFKA_CLIENT_ID);
	}

	static getInstance() {
		if (!KafkaService.instance) {
			KafkaService.instance = new KafkaService();
		}
		return KafkaService.instance;
	}

	static async triggerUploadCompleteEvent(videoId: string) {
		const { producer } = KafkaService.getInstance();

		await producer.connect();
		await producer.produce('transcode', videoId);
		await producer.disconnect();
	}
}
