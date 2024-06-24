import { Kafka, Producer } from 'kafkajs';

import envConfig from '../config/env.config';

export default class KafkaProducer {
	producer: Producer;
	constructor(clientId: string) {
		const kafka = new Kafka({
			clientId,
			brokers: [envConfig.KAFKA_BROKER],
		});
		this.producer = kafka.producer();
	}

	async connect() {
		console.log('connecting producer...');
		await this.producer.connect();
		console.log('connected producer...');
	}

	async disconnect() {
		console.log('disconnecting producer...');
		await this.producer.disconnect();
		console.log('disconnected producer...');
		console.log('------------------------');
	}

	async produce(
		key: string,
		data: { bucket: string; videoId: string },
		partition = 0,
		topic = 'video'
	) {
		console.log('producing message...');
		await this.producer.send({
			topic,
			messages: [{ key, value: JSON.stringify(data), partition }],
		});
		console.log('produced message...');
	}
}
