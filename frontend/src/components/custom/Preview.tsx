import formatDuration from '@/utilities/formatDuration';
import formatViews from '@/utilities/formatViews';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

type PreviewProps = {
	videoId: string;
	imageUrl: string;
	title: string;
	duration: number;
	channelAvatarUrl: string;
	channelName: string;
	channelId: string;
	views: number;
	uploadedAt: Date;
};

export default function Preview({
	videoId,
	imageUrl,
	title,
	duration,
	channelAvatarUrl,
	channelName,
	channelId,
	views,
	uploadedAt,
}: PreviewProps) {
	return (
		<Link to={`/watch?videoId=${videoId}`}>
			<div className='relative overflow-hidden rounded-lg group'>
				<div className='absolute inset-0 grid w-full h-full text-white opacity-0 place-items-center bg-black/50 group-hover:opacity-100'>
					<Play className='w-12 h-12' />
				</div>
				<img src={imageUrl} alt='' />
				<span className='absolute px-2 py-1 text-sm font-medium text-white rounded-md bg-gray-900/70 bottom-3 right-3'>
					{formatDuration(duration)}
				</span>
			</div>
			<div className='flex gap-2 mt-2'>
				<Link to={`/channel/${channelId}`} className=''>
					<img
						src={channelAvatarUrl}
						alt=''
						className='object-cover object-center w-32 rounded-full'
					/>
				</Link>
				<div className='flex flex-col'>
					<div className='text-lg font-medium line-clamp-1'>
						{title}
					</div>
					<Link
						to={`/channel/${channelId}`}
						className='text-sm font-medium text-indigo-500'>
						{channelName}
					</Link>
					<div className='flex gap-2 text-sm text-gray-500'>
						<span>{formatViews(views)} views</span>
						<span>•</span>
						<span>{uploadedAt.toLocaleDateString()}</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
