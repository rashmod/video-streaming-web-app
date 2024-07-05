import { Clapperboard, Image } from 'lucide-react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import FileUpload from './FileUpload';

import formatFileSize from '@/utilities/formatFileSize';
import { THUMBNAIL_MAX_FILE_SIZE } from '@/constants/constants';
import { FileWithUrl } from '@/types/types';
import { Button } from '../ui/button';

const schema = z.object({
	title: z.string().trim().min(5, 'Title must be at least 5 characters long'),
	video: z.object({
		localURL: z.string().trim(),
		file: z
			.instanceof(File, { message: 'Upload video file' })
			.refine((file) => file.type.match('video/*'), 'Invalid file type'),
	}),
	thumbnail: z.object({
		localURL: z.string().trim(),
		file: z
			.instanceof(File, { message: 'Upload image file' })
			.refine((file) => file.type.match('image/*'), 'Invalid file type')
			.refine(
				(file) => file.size <= THUMBNAIL_MAX_FILE_SIZE,
				`File size must be less than ${formatFileSize(
					THUMBNAIL_MAX_FILE_SIZE
				)}`
			),
	}),
});

const defaultFormValues: DefaultValues<Schema> = {
	title: '',
	video: {
		localURL: '',
		file: undefined,
	},
	thumbnail: {
		file: undefined,
		localURL: '',
	},
};

export type Schema = z.infer<typeof schema>;

export default function UploadForm({
	video,
	setVideo,
	thumbnail,
	setThumbnail,
	handleUpload,
}: UploadFormProps) {
	const {
		register,
		trigger,
		handleSubmit,
		setValue,
		watch,
		resetField,
		formState: { errors },
	} = useForm<Schema>({
		defaultValues: defaultFormValues,
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<Schema> = async (data) => {
		console.log(data);
		if (!video) return;
		await handleUpload(video.file);
	};

	console.log(errors);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='grid w-1/2 gap-4 mx-auto mb-10 '>
			<div className='flex flex-col'>
				<label htmlFor='title'>Title</label>
				<textarea
					placeholder='Title'
					id='title'
					className='w-full h-16 p-2 border rounded-md min-h-12 max-h-32'
					{...register('title', { required: 'Title is required' })}
				/>
				<p className='text-red-500'>{errors.title?.message}</p>
			</div>
			<FileUpload
				register={register}
				trigger={trigger}
				error={errors.video?.file}
				setValue={setValue}
				resetField={resetField}
				watch={watch}
				name='video'
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
				register={register}
				trigger={trigger}
				error={errors.thumbnail?.file}
				setValue={setValue}
				resetField={resetField}
				watch={watch}
				name='thumbnail'
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
			<Button className='w-full' type='submit'>
				Upload
			</Button>
		</form>
	);
}

type UploadFormProps = {
	video: FileWithUrl | null;
	setVideo: React.Dispatch<React.SetStateAction<FileWithUrl | null>>;
	thumbnail: FileWithUrl | null;
	setThumbnail: React.Dispatch<React.SetStateAction<FileWithUrl | null>>;
	handleUpload: (file: File) => Promise<void>;
};
