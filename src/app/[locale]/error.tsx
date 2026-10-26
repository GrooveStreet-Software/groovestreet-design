"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <h1 className="text-4xl font-bold text-white">Something went wrong</h1>
      <p className="mt-4 text-gray-400">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
      >
        Try again
      </button>
    </div>
  );
}