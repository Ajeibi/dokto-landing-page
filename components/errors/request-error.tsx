"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

interface RequestError extends Error {
  digest?: string;
  statusCode?: number;
}

export function RequestError({
  error,
}: {
  error: RequestError;
  //   reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const getErrorMessage = (statusCode: number) => {
    switch (statusCode) {
      case 400:
        return "The request was invalid or cannot be served.";
      case 401:
        return "The request requires user authentication.";
      case 403:
        return "You don't have permission to access this resource.";
      case 404:
        return "The requested resource could not be found.";
      case 500:
        return "The server encountered an unexpected condition that prevented it from fulfilling the request.";
      default:
        return "An unexpected error occurred while processing your request.";
    }
  };

  const statusCode = error.statusCode || 500;
  const errorMessage = getErrorMessage(statusCode);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-md text-center">
        <AlertTriangle
          className="mx-auto h-16 w-16 text-warning"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-3xl font-bold">Request Failed</h1>
        <p className="mt-4 text-muted-foreground">{errorMessage}</p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={() => window.location.reload()} variant="default">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          {/* <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to homepage
          </Button> */}
        </div>
      </div>
    </div>
  );
}
