import { Link, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navbar from './components/custom/Navbar';

const queryClient = new QueryClient();

function App() {
	return (
		<main className='min-h-screen'>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<main className='container'>
					<Outlet />
				</main>
				<div className='sticky bottom-0 left-0 z-10 flex items-center justify-around w-full py-3 bg-white shadow-t dark:bg-gray-950'>
					<Link to='/'>Home</Link>
					<Link to='/upload'>Upload</Link>
					<Link to='/watch'>Watch</Link>
				</div>
			</QueryClientProvider>
		</main>
	);
}

export default App;
