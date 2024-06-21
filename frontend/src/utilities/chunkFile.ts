export default function chunkFile(file: File, chunkSize: number) {
	const chunks = [];
	for (let i = 0; i < file.size; i += chunkSize) {
		chunks.push(file.slice(i, i + chunkSize));
	}
	return chunks;
}
