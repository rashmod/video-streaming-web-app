import { useQuery } from 'react-query';

import watch from '../api/watch';
import VideoPlayer from '@/components/custom/VideoPlayer';

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
			<div className='grid w-full grid-cols-5 gap-4'>
				{isLoading && <p>Loading...</p>}
				{isError && <p>Error</p>}
				{!isLoading && !isError && data && (
					<div className='col-span-3'>
						<VideoPlayer url={data.url} token={data.token} />
					</div>
				)}
			</div>
		</>
	);
}

export default Watch;
