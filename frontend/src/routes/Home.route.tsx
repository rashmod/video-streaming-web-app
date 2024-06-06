import { Link } from 'react-router-dom';

function Home() {
	return (
		<>
			<h1 className='text-3xl font-bold underline'>Youtube Clone</h1>
			<h2 className='text-2xl'>Home Page</h2>
			<Link to='/upload'>Upload</Link>
			<Link to='/watch'>Watch</Link>
		</>
	);
}

export default Home;
