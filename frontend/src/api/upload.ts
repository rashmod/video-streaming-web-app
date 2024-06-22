import axios from 'axios';

import envConfig from '../config/env.config';

const UPLOAD_SERVICE_API_URL = envConfig.VITE_UPLOAD_SERVICE_API_URL;

async function initializeUpload(extension: string): Promise<{
	uploadId: string;
	videoId: string;
}> {
	const response = await axios.post(`${UPLOAD_SERVICE_API_URL}/initialize`, {
		extension,
	});
	console.log(response);
	return response.data;
}

async function uploadVideo(
	uploadData: FormData
): Promise<{ message: string; eTag: string | undefined }> {
	const response = await axios.post(
		`${UPLOAD_SERVICE_API_URL}/upload`,
		uploadData,
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	console.log(response);
	return response.data;
}

async function completeUpload(data: {
	uploadId: string;
	videoId: string;
	parts: { ETag: string | undefined; PartNumber: number }[];
}): Promise<{ message: string }> {
	const response = await axios.post(
		`${UPLOAD_SERVICE_API_URL}/complete`,
		data
	);
	console.log(response);
	return response.data;
}

export default { initializeUpload, uploadVideo, completeUpload };
