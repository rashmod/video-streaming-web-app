import envConfig from './config/env.config';
import transcodeProcessor from './processor/transcode.processor';
import KafkaConsumer from './kafka/Kafka';

console.log('starting transcode service...');

async function main() {
	const consumer = new KafkaConsumer(envConfig.KAFKA_CLIENT_ID, 'group-1');

	await consumer.connect();
	await consumer.subscribe('video');
	await consumer.consume(transcodeProcessor);
}

main();
