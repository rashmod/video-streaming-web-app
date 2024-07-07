import { Link } from "react-router-dom";
import { CloudUpload, HomeIcon, LogIn, MonitorPause } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchBox from "@/components/custom/SearchBox";
import BottomNavigationLink from "@/components/custom/BottomNavigationLink";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-10 mb-5 flex w-full items-center justify-between bg-white px-4 py-3 text-gray-950 dark:bg-gray-950 dark:text-white sm:px-6 md:px-8 lg:px-10">
        <Link to="#" className="flex items-center gap-2">
          <MonitorPause className="h-6 w-6" />
          <span className="text-xl font-semibold">Streamline</span>
        </Link>

        <SearchBox />

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          <Link to="/">
            <Button size="sm" variant="ghost">
              Home
            </Button>
          </Link>
          {/* <Link to='#'>
						<Button size='sm' variant='ghost'>
							Profile
						</Button>
					</Link> */}
          <Link to="/upload">
            <Button size="sm" variant="ghost">
              Upload
            </Button>
          </Link>
          {/* <Link to='#'>
						<Button size='sm' variant='ghost'>
							Log Out
						</Button>
					</Link> */}
          <Link to="/register">
            <Button size="sm" variant="outline" className="border-2">
              Register
            </Button>
          </Link>
          <Link to="/log-in">
            <Button size="sm" variant="default">
              Log In
            </Button>
          </Link>
        </nav>
      </header>
      <section className="grow">{children}</section>
      <div className="invisible mt-0 lg:mt-5" />
      <header className="shadow-t sticky bottom-0 left-0 z-10 mt-5 flex w-full items-center justify-around bg-white py-3 dark:bg-gray-950 lg:hidden">
        <BottomNavigationLink to="/" title="Home" Icon={HomeIcon} />
        {/* <BottomNavigationLink
					to='#'
					title='Profile'
					Icon={SquareUser}
				/> */}
        <BottomNavigationLink to="/upload" title="Upload" Icon={CloudUpload} />
        {/* <BottomNavigationLink to='#' title='Log Out' Icon={LogOut} /> */}
        <BottomNavigationLink to="/log-in" title="Log In" Icon={LogIn} />
      </header>
    </>
  );
}
