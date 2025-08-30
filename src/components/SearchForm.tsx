"use client";

import { usePetContext } from "@/lib/hooks";

export default function SearchForm() {
  const { searchQuery, handleChangeSearchQuery } = usePetContext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
        type="search"
        placeholder="search pets..."
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
