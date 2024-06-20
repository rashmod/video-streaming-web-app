import { Link, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<main className='min-h-screen'>
			<QueryClientProvider client={queryClient}>
				<Outlet />
				<Link to='/upload'>Upload</Link>
				<Link to='/watch'>Watch</Link>
			</QueryClientProvider>
		</main>
	);
}

export default App;
