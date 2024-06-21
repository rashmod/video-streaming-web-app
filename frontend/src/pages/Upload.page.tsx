import { useState } from 'react';
import { useMutation } from 'react-query';

import upload from '../api/upload';
import getFileExtension from '../utilities/getFileExtension';
import { chunkSize } from '../constants/constants';
import chunkFile from '../utilities/chunkFile';
import createUploadFormData from '../utilities/createUploadFormData';

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
		const chunks = chunkFile(file, chunkSize);

		const uploadRequest = [];

		for (let i = 0; i < chunks.length; i++) {
			const formData = createUploadFormData({
				file: chunks[i],
				partNumber: i + 1,
				uploadId,
				videoId,
			});

			uploadRequest.push(uploadVideo(formData));
		}

		const uploadResponse = await Promise.all(uploadRequest);

		await completeUpload({
			uploadId,
			videoId,
			parts: uploadResponse.map((res, i) => ({
				ETag: res.eTag,
				PartNumber: i + 1,
			})),
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
