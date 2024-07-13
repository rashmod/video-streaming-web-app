import { Kafka, Consumer } from 'kafkajs';

import envConfig from '../config/env.config';

export default class KafkaConsumer {
	topic = 'video';
	consumer: Consumer;

	constructor(clientId: string, groupId: string) {
		const kafka = new Kafka({
			clientId,
			brokers: [envConfig.KAFKA_BROKER],
		});
		this.consumer = kafka.consumer({ groupId });
	}

	async connect() {
		await this.consumer.connect();
	}

	async disconnect() {
		await this.consumer.disconnect();
	}

	async subscribe(topic: string) {
		await this.consumer.subscribe({ topic, fromBeginning: true });
	}

	pause() {
		console.log('pausing consumer...');
		this.consumer.pause([{ topic: this.topic }]);
	}

	resume() {
		console.log('resuming consumer...');
		this.consumer.resume([{ topic: this.topic }]);
	}

	async consume(
		callback: (message: string, resumeConsumer: () => void) => void
	) {
		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log(
					`topic:[${topic}] partition:[${partition}] message:[${message.value?.toString()}]`
				);

				if (message.value) {
					this.pause();
					callback(message.value.toString(), () => this.resume());
				}
			},
		});
	}
}
