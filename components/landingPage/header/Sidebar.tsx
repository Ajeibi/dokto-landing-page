import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className='cursor-pointer sm:hidden'>
                    <Menu size={30} />
                </button>
            </SheetTrigger>
            <SheetContent side="right" className="h-full max-w-[75%] bg-purple-5">
                <Link href="/home">
                    <Image
                        src="/assets/logo.svg"
                        alt="Logo"
                        className="object-contain cursor-pointer"
                        height={40}
                        width={108}
                    />
                </Link>
                <div className="mt-4">
                    {NAV_LINKS.map((link, index) => (
                        <SheetClose key={index} asChild>
                            <Link
                                key={index}
                                href={link.href}
                                className="block text-blue-2 py-5"
                            >
                                {link.label}
                            </Link>
                        </SheetClose>
                    ))}
                </div>
                <Link href="/auth/login">
                    <Button
                        variant="ocx"
                        className="mt-10 w-full">
                        Login
                    </Button>
                </Link>
                <Link href="/auth/register">
                    <Button
                        variant="ocx1"
                        className="px-[32px] py-[9px] w-full mt-2">
                        Get Started
                    </Button>
                </Link>
            </SheetContent>
        </Sheet>
    );
}

export default Sidebar;