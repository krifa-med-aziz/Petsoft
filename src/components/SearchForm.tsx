import React from "react";

export default function SearchForm() {
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 rounded-md px-4 "
        type="text"
        placeholder="search for a pet..."
      />
    </form>
  );
}
