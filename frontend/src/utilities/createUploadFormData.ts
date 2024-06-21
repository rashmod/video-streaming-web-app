export default function createUploadFormData({
	videoId,
	uploadId,
	partNumber,
	file,
}: {
	videoId: string;
	uploadId: string;
	partNumber: number;
	file: Blob;
}) {
	const formData = new FormData();
	formData.append('videoId', videoId);
	formData.append('uploadId', uploadId);
	formData.append('partNumber', partNumber.toString());
	formData.append('video', file);

	return formData;
}
