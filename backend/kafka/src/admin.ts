import kafka from './kafkaClient';

async function main() {
	console.log('creating admin...');
	const admin = kafka.admin();

	console.log('connecting admin...');
	await admin.connect();
	console.log('connected admin...');

	console.log('creating topics...');
	await admin.createTopics({
		topics: [{ topic: 'video', numPartitions: 2 }],
	});
	console.log('created topics...');

	console.log('disconnecting admin...');
	await admin.disconnect();
	console.log('disconnected admin...');
}

main();
