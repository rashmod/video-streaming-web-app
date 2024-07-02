import { Link, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navbar from './components/custom/Navbar';

const queryClient = new QueryClient();

function App() {
	return (
		<main className='min-h-screen'>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<Outlet />
				<Link to='/'>Home</Link>
				<Link to='/upload'>Upload</Link>
				<Link to='/watch'>Watch</Link>
			</QueryClientProvider>
		</main>
	);
}

export default App;
