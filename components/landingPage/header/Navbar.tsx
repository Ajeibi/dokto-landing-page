'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../ui/button";
import Sidebar from "./Sidebar";
import { NAV_LINKS } from "@/constants";
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-purple-5 lg:px-20">
            <div className="flex items-center">
                <Link href="/home">
                    <Image
                        src="/assets/logo.svg"
                        alt="Logo"
                        className="object-contain cursor-pointer"
                        height={40}
                        width={108}
                    />
                </Link>
            </div>

            <div className="hidden md:flex space-x-10 font-sans text-sm font-normal">
                {NAV_LINKS.map((link, index) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={index}
                            href={link.href}
                            className={`relative ${isActive ? 'text-purple-1' : 'text-blue-2'} after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[3px] after:bg-purple-1 ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'} hover:after:scale-x-100 after:transition-transform after:duration-300`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <Link href="/auth/login">
                    <Button variant="ocx" className="px-8 py-2">
                        Login
                    </Button>
                </Link>
                <Link href="/auth/register">
                    <Button variant="ocx1" className="px-8 py-2">
                        Get Started
                    </Button>
                </Link>
            </div>

            <div className="md:hidden">
                <Sidebar />
            </div>
        </nav>
    );
};

export default Navbar;
