import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navbar from './components/custom/Navbar';

const queryClient = new QueryClient();

function App() {
	return (
		<main className='flex flex-col min-h-screen'>
			<QueryClientProvider client={queryClient}>
				<main className='container grow'>
					<Navbar>
						<Outlet />
					</Navbar>
				</main>
			</QueryClientProvider>
		</main>
	);
}

export default App;
