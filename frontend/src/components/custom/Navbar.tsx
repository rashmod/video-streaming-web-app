import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CloudUpload,
  HomeIcon,
  LogIn,
  LogOut,
  MonitorPause,
  SquareUser,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import SearchBox from "@/components/custom/SearchBox";
import BottomNavigationLink from "@/components/custom/BottomNavigationLink";
import useAuthContext from "@/context/auth/useAuthContext";
import LoggedIn from "./auth/LoggedIn";
import LoggedOut from "./auth/LoggedOut";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    logout: { action: logout },
  } = useAuthContext();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-10 mb-5 flex w-full items-center justify-between bg-white bg-opacity-90 px-4 py-3 text-gray-950 shadow-[0_24px_24px_-6px_rgba(0,0,0,0.1)] backdrop-blur-sm dark:bg-gray-950 dark:text-white sm:px-6 md:px-8 lg:px-10",
          { "shadow-none": isSearchOpen },
        )}
      >
        <Link to="/" className="flex items-center gap-2">
          <MonitorPause className="h-6 w-6" />
          <span className="text-xl font-semibold">Streamline</span>
        </Link>

        <SearchBox
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          <Link to="/">
            <Button size="sm" variant="ghost">
              Home
            </Button>
          </Link>
          <LoggedIn>
            <Link to="/profile">
              <Button size="sm" variant="ghost">
                Profile
              </Button>
            </Link>
            <Link to="/upload">
              <Button size="sm" variant="ghost">
                Upload
              </Button>
            </Link>
            <Link to="#">
              <Button size="sm" variant="ghost" onClick={() => logout()}>
                Log Out
              </Button>
            </Link>
          </LoggedIn>
          <LoggedOut>
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
          </LoggedOut>
        </nav>
      </header>
      <section className="grow">{children}</section>
      <div className="invisible mt-0 lg:mt-5" />
      <header className="shadow-t sticky bottom-0 left-0 z-10 mt-5 flex w-full items-center justify-around bg-white py-3 dark:bg-gray-950 lg:hidden">
        <BottomNavigationLink to="/" title="Home" Icon={HomeIcon} />
        <LoggedIn>
          <BottomNavigationLink
            to="/profile"
            title="Profile"
            Icon={SquareUser}
          />
          <BottomNavigationLink
            to="/upload"
            title="Upload"
            Icon={CloudUpload}
          />
          <BottomNavigationLink
            to="#"
            title="Log Out"
            Icon={LogOut}
            onClick={() => logout()}
          />
        </LoggedIn>
        <LoggedOut>
          <BottomNavigationLink to="/log-in" title="Log In" Icon={LogIn} />
        </LoggedOut>
      </header>
    </>
  );
}
