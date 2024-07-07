import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBox() {
  return (
    <div className="flex items-center gap-4">
      <form className="relative w-full lg:block lg:w-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search..."
          className="h-9 w-full rounded-md border border-gray-300 bg-gray-100 pl-10 text-sm focus:border-gray-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600 lg:w-[600px]"
        />
      </form>
      <Button variant="ghost" size="icon" className="rounded-full lg:hidden">
        <SearchIcon className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
