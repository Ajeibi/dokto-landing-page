"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import Paragraph from "@/components/ui/typography/paragraph";
import { Flex } from "@/components/ui/flex";

export default function NotFound() {
	return (
		<div className="auth_layout relative min-h-screen">
			<div className="centered w-full h-20 bg-white"></div>

			<main className="relative w-full">
				<div className="w-full p-4 md:p-8 lg:p-12 h-auto centered">
					<Flex
						col
						className="min-w-full md:min-w-[660px] p-1 md:p-5 md:px-8  space-y-6 flex flex-col items-center text-tertiary90"
					>
						<Link className="" href="/">
							<Image src="/dokto-logo.svg" alt="" width={158.91} height={48} />
						</Link>
						<Flex
							col
							between
							className="w-full bg-white  p-4 px-8 md:p-8 md:px-[84px] fade-in-30 rounded-[32px]  border-[0.5px] border-stroke400"
						>
							<Paragraph className="text-2xl md:text-3xl">404 not found</Paragraph>
						</Flex>
					</Flex>
				</div>
			</main>

			<style jsx>
				{`
					.auth_layout {
						background-image: url(/grid-lines.png);
						background-size: cover;
						background-repeat: no-repeat;
					}
				`}
			</style>
		</div>
	);
}
