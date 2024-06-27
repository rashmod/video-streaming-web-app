export default function isDownloadComplete(end: number, length: number) {
	return end === length - 1;
}
