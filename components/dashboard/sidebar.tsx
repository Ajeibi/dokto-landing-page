"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../assets/dokto.svg";
import { Flex } from "../ui/flex";
import Paragraph from "../ui/typography/paragraph";
import { navItems } from "./nav-items";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[210px] hidden lg:block fixed left-0 right-0 top-0 bottom-0 bg-[#F7F5FA] pt-8 border-r-[1px] border-[#ccc] border-opacity-40">
      <div className="px-8 ml-2 mb-6">
        <Link href="/dashboard/overview">
          <Image src={Logo} alt="logo" width={100} height={38} />
        </Link>
      </div>

      <div className="w-full space-y-4 h-auto mt-8">
        {navItems.map((item, key) => {
          const isActive = pathname.includes(item.link);
          return (
            <Link key={key} href={item.link}>
              <Flex
                className={cn(
                  "group p-3 pl-8 my-1 gap-3 w-full border-l-4 border-transparent hover:border-primary",
                  isActive && "border-primary"
                )}
              >
                <item.icon
                  className={cn(
                    "text-tertiary80 group-hover:text-primary",
                    isActive && "text-primary"
                  )}
                />

                <Paragraph
                  className={cn(
                    " group-hover:text-primary group-hover:font-semibold",
                    isActive && "text-primary font-semibold"
                  )}
                >
                  {item.label}
                </Paragraph>
              </Flex>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
