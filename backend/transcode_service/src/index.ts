import envConfig from './config/env.config';
import transcodeController from './controller/transcode.controller';
import KafkaConsumer from './kafka/Kafka';

console.log('starting transcode service...');

const consumer = new KafkaConsumer(envConfig.KAFKA_CLIENT_ID, 'group-1');

consumer.connect();
consumer.subscribe('video');
consumer.consume(transcodeController);
