import React from "react";
import H1 from "../components/H1";

export default function notFound() {
  return (
    <main className="flex flex-col justify-center min-h-screen gap-y-3 items-center px-4">
      <H1>404 - Page Not Found</H1>
      <p className="text-gray-500 mt-2">
        Oops! The page you are looking for does not exist.
      </p>
    </main>
  );
}
