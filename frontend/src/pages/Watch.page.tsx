import ReactPlayer from 'react-player';
import { useQuery } from 'react-query';

import watch from '../api/watch';

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
			<h1 className='text-3xl font-bold underline'>Youtube Clone</h1>
			<h2 className='text-2xl'>Watch Page</h2>
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error</p>}
			{!isLoading && !isError && data && (
				<ReactPlayer
					url={data.url}
					config={{
						file: {
							hlsOptions: {
								xhrSetup: function xhrSetup(
									xhr: {
										open: (
											method: string,
											url: string
										) => void;
									},
									url: string
								) {
									xhr.open('GET', url + data.token);
								},
							},
						},
					}}
					controls
				/>
			)}
		</>
	);
}

export default Watch;
