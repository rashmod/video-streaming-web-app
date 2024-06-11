import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<main className='min-h-screen'>
			<QueryClientProvider client={queryClient}>
				<Outlet />
			</QueryClientProvider>
		</main>
	);
}

export default App;
