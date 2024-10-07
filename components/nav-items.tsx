"use client"


import React from "react";
import { Flex } from "@/components/ui/flex";
import { cn } from "@/lib/utils";
import Paragraph from "@/components/ui/typography/paragraph";
import { usePathname, useRouter } from "next/navigation";


export default function NavItems()
{
  const router = useRouter()
  const pathname = usePathname()

  const tabsArray = [
      {
        label: "Dashboard",
        href: "/dashboard/seller",
        meta: {}
      },
      {
        label: "Products",
        href: "/dashboard/seller/products",
        meta: {}
      },
      {
        label: "Order Management",
        href: "/dashboard/seller/orders",
        meta: {}
      },
      {
        label: "Payments and Withdrawals",
        href: "/dashboard/seller/payments",
        meta: {}
      },
      {
        label: "Reviews",
        href: "/dashboard/seller/reviews",
        meta: {}
      },
    ]
    
    function isActive(route:string) {
      return pathname === route.toLowerCase()
      // return pathname.includes()
    }

  return (
      <div className="w-full flex md:gap-20 items-center justify-stretch px-16 sticky top-0 z-20 bg-white pt-5 shadow-sm">
      {
        tabsArray.map((item, index) => (
          <Flex onClick={() => router.push(item.href)} key={index} className={cn("group cursor-pointer capitalize px-8 p-2 border-b-[3px] border-transparent transition-all duration-300 hover:border-primary", isActive(item.href) && "border-primary")}>
            <Paragraph className="group-hover:text-primary">
            {item.label}
            </Paragraph>
          </Flex>
        ))
      }
    </div>
  );
}
