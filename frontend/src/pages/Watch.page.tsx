import { useQuery } from 'react-query';

import Preview from '@/components/custom/Preview';
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
				<div className='col-span-2 '>
					<div className='grid gap-4'>
						{new Array(5).fill(0).map((_, i) => (
							<Preview
								key={i}
								videoId='123'
								imageUrl='https://picsum.photos/640/360'
								duration={Math.floor(Math.random() * 10000)}
								channelAvatarUrl='https://picsum.photos/64/64'
								channelId='123'
								title='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, culpa corrupti distinctio enim aspernatur magnam.'
								channelName='Channel Name'
								views={Math.floor(Math.random() * 1_000_000)}
								uploadedAt={new Date()}
								compact
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Watch;
