"use client";

import { useSignOut } from "@/api/auth/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/context/user";
import { cn, getCurrentPageName } from "@/lib/utils";
import { MenuIcon, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../../assets/dokto.svg";
import { Icons } from "../icons";
import ChangePasswordModal from "../modals/auth/change-password-modal";
import { Flex } from "../ui/flex";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Paragraph from "../ui/typography/paragraph";
import { navItems } from "./nav-items";

export default function Navbar() {
  const { logout } = useSignOut();
  const { User } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [openSheet, setOpenSheet] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard/overview");
    }
  };

  return (
    <>
      <nav className="relative flex items-center justify-between w-full h-[73px] md:h-[99px] bg-[#F7F5FA] border-b-[1px] border-[#cccccc] px-4 md:px-6 lg:px-10 border-opacity-40">
        <div className="flex items-center gap-20">
          <Link className="" href="/">
            <Image src={Logo} alt="logo" width={100} height={38} />
          </Link>

          {/* back button and page name */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={handleBack}
              disabled={pathname === "/dashboard/overview"}
              className="flex items-center gap-1 text-text-sec disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
              <Paragraph className="text-sm font-medium capitalize">
                {getCurrentPageName(pathname)}
              </Paragraph>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="border rounded-full p-3">
            <Icons.bell />
          </div>



          <>
            <Popover>
              <PopoverTrigger className="">
                <Avatar>
                  <AvatarImage
                    src={
                      User?.profilePhoto
                        ? User.profilePhoto
                        : `https://api.multiavatar.com/${
                            User?.firstName ?? "user"
                          }.svg`
                    }
                  />
                  <AvatarFallback className="uppercase">
                    {User?.firstName ? User.firstName.charAt(0) : "U"}
                    {User?.lastName ? User.lastName.charAt(0) : "S"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                className="max-md:w-72 md:w-[18.75rem] p-0"
                align="start"
              >
                <div className="p-5 flex items-center gap-3 bg-[#FAF6FE] mb-3">
                  <Avatar className="h-[3.75rem] w-[3.75rem]">
                    <AvatarImage
                      src={
                        User?.profilePhoto
                          ? User.profilePhoto
                          : `https://api.multiavatar.com/${
                              User?.firstName ?? "user"
                            }.svg`
                      }
                    />
                    <AvatarFallback className="uppercase">
                      {User?.firstName ? User.firstName.charAt(0) : "U"}
                      {User?.lastName ? User.lastName.charAt(0) : "S"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-0.5 capitalize">
                    <Paragraph className="text-[#0B0B0B] font-medium">
                      {User ? `${User.firstName} ${User.lastName}` : "User"}
                    </Paragraph>
                    <Paragraph className="text-xs text-text-sec md:text-sm">
                      {User?.role} Account
                    </Paragraph>
                  </div>
                </div>

                <div className="space-y-1 *:cursor-pointer *:flex *:items-center *:gap-2 *:px-5 *:py-3 ">
                  <Link
                    href={"/dashboard/profile"}
                    className="hover:bg-neutral-100"
                  >
                    <Icons.user />
                    My Profile
                  </Link>
                  <Paragraph
                    className="hover:bg-neutral-100"
                    onClick={() => setOpenPasswordModal(true)}
                  >
                    <Icons.password />
                    Change Password
                  </Paragraph>
                  <Paragraph
                    className="text-error hover:bg-neutral-100"
                    onClick={() => logout()}
                  >
                    <Icons.logout />
                    Logout
                  </Paragraph>
                </div>
              </PopoverContent>
            </Popover>

            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
              <SheetTrigger className="flex gap-4 lg:hidden">
                <MenuIcon />
              </SheetTrigger>
              <SheetContent className="space-y-3">
                <SheetHeader className="mb-12">
                  <SheetTitle>
                    <Link className="" href="/">
                      <Image src={Logo} alt="logo" width={100} height={38} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="space-y-6">
                  {navItems.map((item, key) => {
                    const isActive = pathname.includes(item.link);
                    return (
                      <Link key={key} href={item.link}>
                        <Flex
                          className={cn(
                            "group p-3 pl-8 my-1 gap-3 w-full border-l-4 border-transparent hover:border-primary",
                            isActive && "border-primary"
                          )}
                          onClick={() => setOpenSheet(false)}
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
              </SheetContent>
            </Sheet>
          </>
        </div>
      </nav>

      <ChangePasswordModal
        open={openPasswordModal}
        onOpenChange={setOpenPasswordModal}
      />
    </>
  );
}
