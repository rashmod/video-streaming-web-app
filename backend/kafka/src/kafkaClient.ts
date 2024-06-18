import { Kafka } from 'kafkajs';

const kafka = new Kafka({
	clientId: 'youtube-clone',
	brokers: ['kafka:9092'],
});

export default kafka;
