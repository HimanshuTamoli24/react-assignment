"use client"; // required for buttons/hooks

import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-2 text-red-600">
      <AlertTriangle className="w-6 h-6" />
      <p className="font-medium">Something went wrong!</p>
      <p className="text-sm text-gray-500">{error.message}</p>
      <button
        className="px-3 py-1 rounded bg-blue-600 text-white"
        onClick={() => reset()}
      >
        Retry
      </button>
    </div>
  );
}
