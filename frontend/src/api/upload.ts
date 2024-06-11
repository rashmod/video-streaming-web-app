import axios from 'axios';

async function uploadVideo() {
	const response = await axios.post('http://127.0.0.1:3001/upload');
	console.log(response);
}

export default uploadVideo;
