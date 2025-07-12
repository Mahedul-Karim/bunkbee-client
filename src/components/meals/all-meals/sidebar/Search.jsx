import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Search = () => {
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        searchParams.set("search", search);
      } else {
        searchParams.delete("search");
      }

      setSearchParams(searchParams);
    }, 600);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="flex items-center bg-white rounded-md h-10 pr-2 border border-border">
      <Input
        type={"text"}
        className="bg-transparent shadow-none border-none text-dark"
        placeholder="Search Meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchIcon className="text-muted" />
    </div>
  );
};

export default Search;
