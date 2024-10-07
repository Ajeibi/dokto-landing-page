import React from "react";
import Link from "next/link";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import { FOOTER_LINKS } from "@/constants";

const getCurrentYear = () => {
    return new Date().getFullYear();
};

const Footer = () => {
    return (
        <footer className="bg-purple-5 p-6 lg:px-20 lg:pt-20">
            <div className="flex flex-col md:flex-row">
                <div className="space-y-4 w-full md:w-1/4">
                    <Link href="/home" className="mb-6 block">
                        <Image
                            src="/assets/logo.svg"
                            alt="Logo"
                            height={40}
                            width={108}
                        />
                    </Link>
                    <div className="space-y-5 text-blue-1">
                        <h1 className="font-sans font-medium text-base">Head Office</h1>
                        <p className="font-sans font-normal text-sm">
                            2, Address Area, Street Address Address Address, London, United States.
                        </p>

                        <p className="font-sans font-medium text-base">Socials</p>
                        <div className="flex space-x-4 mt-2">
                            <Link href="/" aria-label="Twitter">
                                <Image
                                    src="/assets/icons/twitter.svg"
                                    alt="Twitter Logo"
                                    height={15}
                                    width={15}
                                />
                            </Link>
                            <Link href="/" aria-label="LinkedIn">
                                <Image
                                    src="/assets/icons/linkedIn.svg"
                                    alt="LinkedIn Logo"
                                    height={15}
                                    width={15}
                                />
                            </Link>
                            <Link href="/" aria-label="Facebook">
                                <Image
                                    src="/assets/icons/facebook.svg"
                                    alt="Facebook Logo"
                                    height={15}
                                    width={15}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/4 order-2 md:order-2 font-sans">
                    <div className="hidden md:grid md:grid-cols-5 gap-3">
                        {Object.entries(FOOTER_LINKS).map(([header, links]) => (
                            <div key={header}>
                                <h3 className="font-sans font-medium text-base mb-5 text-blue-1">{header}</h3>
                                <ul className="space-y-3 text-blue-2">
                                    {links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className="font-sans font-normal text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="md:hidden mt-10">
                        <Accordion type="single" collapsible>
                            {Object.entries(FOOTER_LINKS).map(([header, links], index) => (
                                <AccordionItem key={header} value={`item-${index}`}>
                                    <AccordionTrigger className="font-sans font-medium text-base">
                                        {header}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="mx-5 space-y-2">
                                            {links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <Link
                                                        href={link.href}
                                                        className="font-sans font-normal text-sm"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

            <div className="font-sans mt-10 flex flex-col-reverse md:flex-row justify-between w-full pt-4 max-sm:items-center">
                <p className="text-sm text-gray-600 mt-4">
                    © {getCurrentYear()} Dokto.health. All rights reserved.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-800">
                        Terms
                    </Link>
                    <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-800">
                        Privacy Policy
                    </Link>
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;