import axios from 'axios';

async function uploadVideo(uploadData: FormData) {
	const response = await axios.post(
		'http://localhost:3001/upload',
		uploadData,
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);
	console.log(response);
}

export default uploadVideo;
