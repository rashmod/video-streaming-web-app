import ReactPlayer from 'react-player';

function Watch() {
	return (
		<>
			<h1 className='text-3xl font-bold underline'>Youtube Clone</h1>
			<h2 className='text-2xl'>Watch Page</h2>
			<ReactPlayer
				url={'https://www.youtube.com/watch?v=LMYWGpt6ppM'}
				controls
			/>
		</>
	);
}

export default Watch;
