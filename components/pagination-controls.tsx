"use client";

import { Button } from "@/components/ui/button";
import { updateUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  totalPages: number;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  totalPages,
}) => {
  const currentPage = Number(useSearchParams().get("page")) || 1;
  const router = useRouter();

  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const delta = 1;
    const left = currentPage - delta;
    const right = currentPage + delta;

    // Add the first page
    if (left > 2) {
      range.push(1);
      if (left > 3) {
        range.push("...");
      }
    } else {
      for (let i = 1; i < Math.max(2, left); i++) {
        range.push(i);
      }
    }

    // Add pages around the current page
    for (let i = Math.max(2, left); i <= Math.min(totalPages - 1, right); i++) {
      range.push(i);
    }

    // Add the last page
    if (right < totalPages - 1) {
      if (right < totalPages - 2) {
        range.push("...");
      }
      range.push(totalPages);
    } else {
      for (let i = Math.max(right + 1, totalPages - 1); i <= totalPages; i++) {
        range.push(i);
      }
    }

    return range;
  };

  const url = (page: number) => {
    const parsedUrl = updateUrl("page", page);
    return parsedUrl;
  };

  return (
    <div className="flex items-center gap-2 justify-center mt-4 max-w-96 mx-auto w-full">
      {currentPage !== 1 && (
        <Button
          onClick={() => router.push(url(currentPage - 1))}
          variant={"link"}
          className="p-1"
        >
          Previous page
        </Button>
      )}
      {getPaginationRange().map((page, index) =>
        page === "..." ? (
          <span key={page} className="px-3 py-1">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => router.push(url(Number(page)))}
            className="w-8 h-8 text-xs rounded-lg"
          >
            {page}
          </Button>
        )
      )}
      {currentPage !== totalPages && (
        <Button
          onClick={() => router.push(url(currentPage + 1))}
          variant={"link"}
          className="p-1"
        >
          Next page
        </Button>
      )}
    </div>
  );
};
