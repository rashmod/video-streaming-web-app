import { useState } from 'react';
import { useMutation } from 'react-query';

import upload from '../api/upload';

import getFileExtension from '../utilities/getFileExtension';
import chunkFile from '../utilities/chunkFile';
import createUploadFormData from '../utilities/createUploadFormData';

import { CHUNK_SIZE } from '@/constants/constants';
import { FileWithUrl } from '@/types/types';
import UploadForm from '@/components/custom/UploadForm';

export default function Upload() {
	const [video, setVideo] = useState<FileWithUrl | null>(null);
	const [thumbnail, setThumbnail] = useState<FileWithUrl | null>(null);

	const { mutateAsync: initializeUpload } = useMutation({
		mutationFn: upload.initializeUpload,
	});

	const { mutateAsync: uploadVideo } = useMutation({
		mutationFn: upload.uploadVideo,
	});

	const { mutateAsync: completeUpload } = useMutation({
		mutationFn: upload.completeUpload,
	});

	async function handleUpload(file: File) {
		const extension = getFileExtension(file.name);
		const initResponse = await initializeUpload(extension);
		const { uploadId, videoId } = initResponse;

		const chunks = chunkFile(file, CHUNK_SIZE);
		const uploadRequest = chunks.map((chunk, i) =>
			uploadVideo(
				createUploadFormData({
					file: chunk,
					partNumber: i + 1,
					uploadId,
					videoId,
				})
			)
		);

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
			<UploadForm
				video={video}
				setVideo={setVideo}
				thumbnail={thumbnail}
				setThumbnail={setThumbnail}
				handleUpload={handleUpload}
			/>
		</>
	);
}
