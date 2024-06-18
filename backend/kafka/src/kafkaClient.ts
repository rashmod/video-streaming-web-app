import { Kafka } from 'kafkajs';

// todo use dotenv for clientId and brokers
const kafka = new Kafka({
	clientId: 'youtube-clone',
	brokers: ['kafka:9092'],
});

export default kafka;
