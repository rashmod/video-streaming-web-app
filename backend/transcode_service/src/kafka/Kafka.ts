import { Kafka, Consumer } from 'kafkajs';

export default class KafkaConsumer {
	consumer: Consumer;
	constructor(clientId: string, groupId: string) {
		const kafka = new Kafka({ clientId, brokers: ['localhost:29092'] });
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

	async consume(callback: (message: string | undefined) => void) {
		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log(
					`topic:[${topic}] partition:[${partition}] message:[${message.value?.toString()}]`
				);
				callback(message.value?.toString());
			},
		});
	}
}
