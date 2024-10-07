"use client";

import { useRouter } from "next/navigation";

export function useRedirect(url: string) {
	const router = useRouter();
	return router.push(url);
}
