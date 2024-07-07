import { SearchIcon, XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SearchBox({
  isSearchOpen,
  setIsSearchOpen,
}: {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full lg:hidden"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        {isSearchOpen ? (
          <XIcon className="h-5 w-5" />
        ) : (
          <SearchIcon className="h-5 w-5" />
        )}
        <span className="sr-only">Search</span>
      </Button>

      <form
        className={cn(
          "absolute left-0 top-full z-20 hidden shadow-[0_24px_24px_-6px_rgba(0,0,0,0.1)] lg:relative lg:block lg:shadow-none",
          {
            "block w-full": isSearchOpen,
          },
        )}
      >
        <div className="absolute inset-y-0 left-0 hidden items-center pl-3 lg:flex">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search..."
          className="h-9 w-full rounded-md border border-gray-300 bg-gray-100 text-sm focus:border-gray-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600 lg:w-[600px] lg:pl-10"
        />
      </form>
    </>
  );
}
