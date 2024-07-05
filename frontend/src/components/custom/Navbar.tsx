import { Link } from 'react-router-dom';
import { HomeIcon, MonitorPause, SquareUser } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SearchBox from './SearchBox';

export default function Navbar({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header className='sticky top-0 z-10 flex items-center justify-between w-full px-4 py-3 mb-5 bg-white shadow-sm text-gray-950 dark:text-white dark:bg-gray-950 sm:px-6 md:px-8 lg:px-10'>
				<Link to='#' className='flex items-center gap-2'>
					<MonitorPause className='w-6 h-6' />
					<span className='text-xl font-semibold'>Streamline</span>
				</Link>

				<SearchBox />

				<nav className='items-center hidden gap-6 text-sm font-medium lg:flex'>
					<Link to='#'>
						<Button variant='link'>Home</Button>
					</Link>
					<Link to='#'>
						<Button size='sm'>Sign In</Button>
					</Link>
				</nav>
			</header>
			{children}
			<header className='sticky bottom-0 left-0 z-10 flex items-center justify-around w-full py-3 mt-5 bg-white shadow-t dark:bg-gray-950 lg:hidden'>
				<Link
					to='#'
					className='flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
					<HomeIcon className='w-6 h-6' />
					Home
				</Link>
				<Link
					to='#'
					className='flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'>
					<SquareUser className='w-6 h-6' />
					Profile
				</Link>
			</header>
		</>
	);
}
