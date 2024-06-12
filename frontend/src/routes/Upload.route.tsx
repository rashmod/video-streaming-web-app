import { useState } from 'react';
import { useMutation } from 'react-query';

import uploadVideo from '../api/upload';

function Upload() {
	const { mutate } = useMutation({
		mutationFn: uploadVideo,
	});

	const [file, setFile] = useState<File | null>(null);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		setFile(e.target.files[0]);
	}

	function handleUpload(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!file) return;

		const formData = new FormData();
		formData.append('video', file);
		mutate(formData);
	}

	return (
		<>
			<h1 className='text-3xl font-bold underline'>Youtube Clone</h1>
			<h2 className='text-2xl'>Home Page</h2>
			<form onSubmit={handleUpload}>
				<input type='file' name='' id='' onChange={handleFileChange} />
				<button type='submit'>Upload</button>
			</form>
		</>
	);
}

export default Upload;
