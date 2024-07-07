import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import formatDuration from '@/utilities/formatDuration';
import formatViews from '@/utilities/formatViews';

import LazyImage from '@/components/custom/LazyImage';

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
	compact?: boolean;
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
	compact = false,
}: PreviewProps) {
	// todo add image placeholder for lazy loading
	return (
		<Link
			to={`/watch?videoId=${videoId}`}
			className={cn({ 'flex gap-x-2': compact })}>
			<div className='relative flex w-full overflow-hidden rounded-lg aspect-video group'>
				<div className='absolute inset-0 grid text-white opacity-0 place-items-center bg-black/50 group-hover:opacity-100'>
					<Play className={cn('w-12 h-12', { 'w-6 h-6': compact })} />
				</div>
				<LazyImage src={imageUrl} alt={title} />
				<span className='absolute px-2 py-1 text-sm font-medium text-white rounded-md bg-gray-900/70 bottom-3 right-3'>
					{formatDuration(duration)}
				</span>
			</div>
			<div className='flex gap-2 mt-2'>
				{!compact && (
					<Link to={`/channel/${channelId}`} className=''>
						<img
							src={channelAvatarUrl}
							alt=''
							className='object-cover object-center w-32 rounded-full'
						/>
					</Link>
				)}
				<div className='flex flex-col'>
					<div
						className={cn('text-lg font-medium line-clamp-1', {
							'text-base': compact,
						})}>
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
