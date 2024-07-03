import {
	ChangeEvent,
	DragEvent,
	ForwardRefExoticComponent,
	RefAttributes,
	useState,
} from 'react';
import { LucideProps, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import processFiles from '@/utilities/processFiles';

import { FileWithUrl } from '@/types/types';

export default function FileUpload({
	type,
	acceptedFileTypes,
	Icon,
	file,
	setFile,
	title,
	subtitle,
	id,
	...rest
}: FileUpload) {
	const [dragActive, setDragActive] = useState(false);

	function selectFile(file: FileWithUrl | undefined) {
		if (file && file.file.type.match(acceptedFileTypes)) setFile(file);
	}

	function handleFiles(files: FileList) {
		if (type === 'image' && 'maxFileSize' in rest) {
			const file = processFiles(files, rest.maxFileSize);
			selectFile(file);
		} else {
			const file = processFiles(files);
			selectFile(file);
		}
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		if (!event.target.files) return;
		handleFiles(event.target.files);
	}

	function handleDrop(event: DragEvent<HTMLLabelElement>) {
		event.preventDefault();
		event.stopPropagation();

		if (!event.dataTransfer.files) return;

		handleFiles(event.dataTransfer.files);
		setDragActive(false);
		event.dataTransfer.clearData();
	}

	function handleDrag(event: DragEvent<HTMLLabelElement>) {
		event.preventDefault();
		event.stopPropagation();

		switch (event.type) {
			case 'dragenter':
			case 'dragover':
				setDragActive(true);
				break;

			case 'dragleave':
			case 'drop':
				setDragActive(false);
				break;

			default:
				break;
		}
	}

	return (
		<div className='mb-5 rounded-xl min-h-32'>
			{!file ? (
				<>
					<input
						type='file'
						accept={acceptedFileTypes}
						className='hidden'
						onChange={handleChange}
						id={id}
					/>
					<label
						htmlFor={id}
						className={cn(
							'flex flex-col items-center justify-center h-32 transition duration-200 border-2 border-black border-dashed cursor-pointer group rounded-xl hover:bg-gray-100',
							{
								'bg-gray-100': dragActive,
							}
						)}
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag}
						onDrop={handleDrop}>
						<Icon height={50} width={50} />
						<span>{title}</span>
						<span className='mt-1 text-xs transition duration-200 text-slate-400 group-hover:text-slate-700'>
							{subtitle}
						</span>
					</label>
				</>
			) : (
				<div className='p-3'>
					<div className='w-full mx-auto'>
						<div
							key={file.localURL}
							className='relative w-full h-full aspect-video group'>
							{type === 'video' && (
								<video
									src={file.localURL}
									className='object-cover w-full h-full rounded-md min-w-32'
									controls
								/>
							)}
							{type === 'image' && (
								<img
									src={file.localURL}
									className='object-cover w-full rounded-md min-w-32'
									loading='lazy'
								/>
							)}
							<div className='absolute top-0 right-0 flex items-center justify-center w-12 gap-4 text-white transition duration-200 origin-top-right bg-black rounded-md bg-opacity-90 hover:bg-opacity-100 aspect-square hover:scale-150'>
								<Trash2
									className='hover:text-red-400'
									onClick={() => setFile(null)}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

type ImageUpload = {
	type: 'image';
	acceptedFileTypes: 'image/*';
	maxFileSize: number;
};
type VideoUpload = {
	type: 'video';
	acceptedFileTypes: 'video/*';
};
type CommonProps = {
	Icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
	setFile: React.Dispatch<React.SetStateAction<FileWithUrl | null>>;
	file: FileWithUrl | null;
	title: string;
	subtitle: string;
	id: string;
};
type FileUpload = CommonProps & (ImageUpload | VideoUpload);
