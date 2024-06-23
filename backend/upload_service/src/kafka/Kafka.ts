import { Kafka, Producer } from 'kafkajs';

export default class KafkaProducer {
	producer: Producer;
	constructor(clientId: string) {
		const kafka = new Kafka({ clientId, brokers: ['localhost:29092'] });
		this.producer = kafka.producer();
	}

	async connect() {
		await this.producer.connect();
	}

	async disconnect() {
		await this.producer.disconnect();
	}

	async produce(
		key: string,
		data: { bucket: string; videoId: string },
		partition = 0,
		topic = 'video'
	) {
		await this.producer.send({
			topic,
			messages: [{ key, value: JSON.stringify(data), partition }],
		});
	}
}
