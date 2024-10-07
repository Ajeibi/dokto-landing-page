"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md text-center">
        <AlertCircle
          className="mx-auto h-16 w-16 text-destructive"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-3xl font-bold">Oops! Network Error</h1>
        <p className="mt-2 text-xl">We couldn't complete your request</p>
        <p className="mt-4 text-muted-foreground">
          {error.message ||
            "There was a problem connecting to the server. Please check your internet connection and try again."}
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </main>
  );
}
