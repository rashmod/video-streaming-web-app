import { useState } from 'react';
import { useMutation } from 'react-query';

import upload from '../api/upload';
import getFileExtension from '../utilities/getFileExtension';

function Upload() {
	const { mutateAsync: initializeUpload } = useMutation({
		mutationFn: upload.initializeUpload,
	});

	const { mutateAsync: uploadVideo } = useMutation({
		mutationFn: upload.uploadVideo,
	});

	const { mutateAsync: completeUpload } = useMutation({
		mutationFn: upload.completeUpload,
	});

	const [file, setFile] = useState<File | null>(null);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		setFile(e.target.files[0]);
	}

	async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!file) return;

		const extension = getFileExtension(file.name);

		const initResponse = await initializeUpload(extension);

		const { uploadId, videoId } = initResponse;

		const partNumber = 1;

		const formData = new FormData();
		formData.append('videoId', videoId);
		formData.append('uploadId', uploadId);
		formData.append('partNumber', partNumber.toString());
		formData.append('video', file);

		const uploadResponse = await uploadVideo(formData);

		const { eTag } = uploadResponse;

		await completeUpload({
			uploadId,
			videoId,
			parts: [
				{
					ETag: eTag,
					PartNumber: partNumber,
				},
			],
		});
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
