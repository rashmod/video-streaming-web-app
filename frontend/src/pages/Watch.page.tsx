import { useQuery } from 'react-query';

import watch from '../api/watch';
import Video from '@/components/custom/Video';
import ChannelInfo from '@/components/custom/ChannelInfo';

function Watch() {
	const videoId = '123';

	const { data, isError, isLoading } = useQuery({
		queryKey: ['video', videoId],
		queryFn: () => watch.watchVideo(videoId),

		refetchInterval: false,
		refetchIntervalInBackground: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<div className='grid w-full gap-8 lg:grid-cols-5'>
				{isLoading && <p>Loading...</p>}
				{isError && <p>Error</p>}
				{!isLoading && !isError && data && (
					<div className='col-span-3'>
						<Video
							title='Quae qui modi libero deserunt est natus reiciendis explicabo quidem.'
							uploadedAt={new Date()}
							url={data.url}
							token={data.token}
						/>
						<ChannelInfo
							channelId='123'
							channelName='Channel Name'
							createdAt={new Date()}
							channelAvatarUrl='https://picsum.photos/64/64'
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Watch;
