import { useState } from 'react';
import { useMutation } from 'react-query';
import { Clapperboard, Image } from 'lucide-react';

import upload from '../api/upload';

import getFileExtension from '../utilities/getFileExtension';
import chunkFile from '../utilities/chunkFile';
import createUploadFormData from '../utilities/createUploadFormData';
import formatFileSize from '@/utilities/formatFileSize';

import FileUpload from '@/components/custom/FileUpload';

import { CHUNK_SIZE, THUMBNAIL_MAX_FILE_SIZE } from '@/constants/constants';
import { FileWithUrl } from '@/types/types';

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

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!video) return;
		await handleUpload(video.file);
	}

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
			<form onSubmit={handleSubmit}>
				<FileUpload
					type='video'
					acceptedFileTypes='video/*'
					Icon={Clapperboard}
					setFile={setVideo}
					file={video}
					title='Click to upload or drag and drop video'
					subtitle='Any video format'
					id='video'
				/>
				<FileUpload
					type='image'
					acceptedFileTypes='image/*'
					Icon={Image}
					file={thumbnail}
					setFile={setThumbnail}
					title='Click to upload or drag and drop thumbnail'
					subtitle={`Any image format. Max size: ${formatFileSize(
						THUMBNAIL_MAX_FILE_SIZE
					)}`}
					maxFileSize={THUMBNAIL_MAX_FILE_SIZE}
					id='thumbnail'
				/>
				<button type='submit'>Upload</button>
			</form>
		</>
	);
}
