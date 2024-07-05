import { Link } from 'react-router-dom';
import { CloudUpload, HomeIcon, LogIn, MonitorPause } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SearchBox from '@/components/custom/SearchBox';
import BottomNavigationLink from '@/components/custom/BottomNavigationLink';

export default function Navbar({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header className='sticky top-0 z-10 flex items-center justify-between w-full px-4 py-3 mb-5 bg-white text-gray-950 dark:text-white dark:bg-gray-950 sm:px-6 md:px-8 lg:px-10'>
				<Link to='#' className='flex items-center gap-2'>
					<MonitorPause className='w-6 h-6' />
					<span className='text-xl font-semibold'>Streamline</span>
				</Link>

				<SearchBox />

				<nav className='items-center hidden gap-6 text-sm font-medium lg:flex'>
					<Link to='/'>
						<Button size='sm' variant='ghost'>
							Home
						</Button>
					</Link>
					{/* <Link to='#'>
						<Button size='sm' variant='ghost'>
							Profile
						</Button>
					</Link> */}
					<Link to='/upload'>
						<Button size='sm' variant='ghost'>
							Upload
						</Button>
					</Link>
					{/* <Link to='#'>
						<Button size='sm' variant='ghost'>
							Log Out
						</Button>
					</Link> */}
					{/* <Link to='/register'>
						<Button
							size='sm'
							variant='outline'
							className='border-2'>
							Register
						</Button>
					</Link> */}
					<Link to='/log-in'>
						<Button size='sm' variant='default'>
							Log In
						</Button>
					</Link>
				</nav>
			</header>
			<section className='grow'>{children}</section>
			<div className='invisible mt-0 lg:mt-5' />
			<header className='sticky bottom-0 left-0 z-10 flex items-center justify-around w-full py-3 mt-5 bg-white shadow-t dark:bg-gray-950 lg:hidden'>
				<BottomNavigationLink to='/' title='Home' Icon={HomeIcon} />
				{/* <BottomNavigationLink
					to='#'
					title='Profile'
					Icon={SquareUser}
				/> */}
				<BottomNavigationLink
					to='/upload'
					title='Upload'
					Icon={CloudUpload}
				/>
				{/* <BottomNavigationLink to='#' title='Log Out' Icon={LogOut} /> */}
				<BottomNavigationLink
					to='/log-in'
					title='Log In'
					Icon={LogIn}
				/>
			</header>
		</>
	);
}
