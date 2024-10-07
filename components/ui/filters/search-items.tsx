"use client";

import { useState, useEffect } from "react";
import { Input } from "../input";
import { useRouter, useSearchParams } from "next/navigation";
import { updateUrl } from "@/lib/utils";
import useDebounce from "@/hooks/use-debounce";

export default function SearchItems({
  placeholder = "Search...",
}: {
  placeholder?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultVal = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(defaultVal);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== defaultVal) {
      router.push(updateUrl("query", debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, defaultVal, router]);

  return (
    <Input
      placeholder={placeholder}
      onChange={(event) => setSearchTerm(event.target.value)}
      value={searchTerm}
      className="pl-5 py-[9px] w-full sm:w-[200px] lg:w-[350px] h-fit bg-transparent rounded-[24px] border border-gray-300 placeholder:text-gray-400"
    />
  );
}
