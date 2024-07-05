import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navbar from './components/custom/Navbar';

const queryClient = new QueryClient();

function App() {
	return (
		<main className='flex flex-col min-h-screen'>
			<QueryClientProvider client={queryClient}>
				<section className='container flex flex-col grow'>
					<Navbar>
						<Outlet />
					</Navbar>
				</section>
			</QueryClientProvider>
		</main>
	);
}

export default App;
