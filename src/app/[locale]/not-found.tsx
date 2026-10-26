"use client";

import { useState } from "react";

export default function NotFound() {
  const [show, setShow] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      {show && (
        <>
          <h1 className="text-6xl font-bold text-white">404</h1>
          <p className="mt-4 text-gray-400">This page could not be found.</p>
          <button
            onClick={() => setShow(false)}
            className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Go back home
          </button>
        </>
      )}
      {!show && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400">The page has been removed or moved.</p>
          <a
            href="/"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Return to home
          </a>
        </div>
      )}
    </div>
  );
}
