"use client";

import {
  SubscriptionInfo,
  useGetSubscriptionsByCategory,
} from "@/api/dashboard/subscription/get-subscription-by-category";
import { SubscriptionPayment } from "@/components/dashboard/subscriptions/steps/subscription-payment";
import Loading from "@/components/loading";
import { PaginationControls } from "@/components/pagination-controls";
import { Button } from "@/components/ui/button";
import Paragraph from "@/components/ui/typography/paragraph";
import { formatAmountWithCurrency } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SubscriptionPlanPage() {
  const param = useSearchParams().entries();
  const query = Object.fromEntries(param);

  const { data, isLoading } = useGetSubscriptionsByCategory(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto">
        {data?.results.map((p, idx) => (
          <SubscriptionPlanCard key={p._id} {...p} idx={idx + 1} />
        ))}
      </section>

      <PaginationControls totalPages={data?.totalPages!} />
    </>
  );
}

function SubscriptionPlanCard(props: SubscriptionInfo & { idx: number }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="min-h-[18.3125rem] w-full rounded-2xl bg-white px-6 pt-8 pb-10 border border-gray-200 relative overflow-hidden">
        <div className="space-y-4">
          <div className="bg-[#F2E7FF] w-fit rounded-md px-3 py-1">
            <Paragraph className="text-text text-xs md:text-sm">
              Option {props.idx}
            </Paragraph>
          </div>

          <Paragraph className="text-sm uppercase md:text-base text-text font-medium">
            {props.name}
          </Paragraph>
        </div>

        <div className="mt-10 mb-11 flex items-center justify-between">
          <Paragraph className="font-medium text-text text-sm md:text-base capitalize">
            {props.category} Fee
          </Paragraph>
          <Paragraph className="font-medium text-text text-sm md:text-base ">
            {formatAmountWithCurrency(props.price, props.currency)}
          </Paragraph>
        </div>

        <Button className="w-full capitalize" onClick={() => setIsOpen(true)}>
          Choose {props.name}
        </Button>

        <div className="border absolute border-[#00698F] w-52 h-52 -top-32 -right-24 rounded-full -rotate-[27deg] z-10" />
        <div className="border absolute border-[#00698F] w-52 h-52 -top-36 -right-16 rounded-full -rotate-[27deg] z-10" />
      </div>

      <SubscriptionPayment {...props} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
