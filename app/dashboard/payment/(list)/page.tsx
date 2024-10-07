"use client";

import { useGetSubscriptions } from "@/api/dashboard/subscription/get-subscriptions";
import { subscription_columns } from "@/components/columns/subscriptions-column";
import Loading from "@/components/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { EmptySubscriptionState } from "@/components/ui/empty-state/empty-states";
import Tabs from "@/components/ui/nav-tab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { subscription_tabs } from "@/constants/subscriptions";
import { useUser } from "@/context/user";
import { parseTabs } from "@/lib/utils";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import WalletPage from "../wallet/page";

const subscription_nav_tabs = [
  {
    name: "All Subscription",
    href: "all",
  },
  {
    name: "Successful Subscriptions",
    href: "active",
  },
  {
    name: "Pending Subscriptions",
    href: "pending",
  },
  {
    name: "Failed Subscriptions",
    href: "cancelled",
  },
];

export default function SubscriptionPage() {
  const { User } = useUser();
  const isPatient = User?.role === "patient";

  if (!isPatient) {
    return <WalletPage />;
  }

  let daysLeft = 24;
  const param = useSearchParams().entries();
  const query = Object.fromEntries(param);
  const router = useRouter();
  const tab = parseTabs(subscription_tabs, query["tab"]);

  const { data, isLoading } = useGetSubscriptions(query);

  if (tab !== query["tab"]) {
    router.push(`/dashboard/payment?tab=${tab}`);
    return;
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  if (data.results.length === 0) return <EmptySubscriptionState />;

  return (
    <>
      <section className="mb-5">
        <Card className="bg-white rounded-xl mb-10">
          <CardHeader className="mb-6">
            <CardTitle className="mb-3">Current Subscription Details</CardTitle>
            <Separator />
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 min-[360px]:grid-cols-2 min-[1160px]:grid-cols-4 xl:grid-cols-3 gap-5">
              <div className="flex flex-col lg:flex-row lg:gap-10 gap-2 min-[360px]:gap-5 min-[1160px]:col-span-2 xl:col-span-1">
                <Paragraph className="text-text-subtle text-xs md:text-sm min-[1160px]:w-[140px] ">
                  Current Plan:
                </Paragraph>
                <Paragraph className="text-text text-xs md:text-sm">
                  1-Month Membership
                </Paragraph>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-10 gap-2 min-[360px]:gap-5">
                <Paragraph className="text-text-subtle text-xs md:text-sm lg:w-[71px]">
                  Valid For:
                </Paragraph>
                <Paragraph className="text-text text-xs md:text-sm">
                  30 days
                </Paragraph>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-10 gap-2 min-[360px]:gap-5">
                <Paragraph className="text-text-subtle text-xs md:text-sm">
                  Days Left:
                </Paragraph>
                <Paragraph
                  className={`text-text text-xs md:text-sm ${daysLeft > 0 ? "text-green-400" : "text-error"
                    }`}
                >
                  24
                </Paragraph>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-10 gap-2 min-[360px]:gap-5 min-[1160px]:col-span-2 xl:col-span-1">
                <Paragraph className="text-text-subtle text-xs md:text-sm">
                  Date of Subscription:
                </Paragraph>
                <Paragraph className="text-text text-xs md:text-sm">
                  23-02-2023
                </Paragraph>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-10 gap-2 min-[360px]:gap-5">
                <Paragraph className="text-text-subtle text-xs md:text-sm">
                  Start Date:
                </Paragraph>
                <Paragraph className="text-text text-xs md:text-sm">
                  23-02-2023
                </Paragraph>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-10 gap-2 min-[360px]:gap-5">
                <Paragraph className="text-text-subtle text-xs md:text-sm">
                  End Date:
                </Paragraph>
                <Paragraph className="text-text text-xs md:text-sm">
                  23-03-2023
                </Paragraph>
              </div>
            </div>

            {daysLeft <= 0 ? (
              <Paragraph className="text-error text-xs md:text-sm mt-6">
                You currently do not have an active subscription plan. To
                subscribe to a new plan, please use the "New Subscription"
                button.
              </Paragraph>
            ) : null}
          </CardContent>
        </Card>

        <div className="space-y-4 md:space-y-6">
          <ScrollArea>
            <Tabs tabs={subscription_nav_tabs} />
            <Scrollbar orientation="horizontal" className="pt-1" />
          </ScrollArea>

          <DataTable
            columns={subscription_columns}
            data={data?.results ?? []}
            emptyState={<EmptySubscriptionState />}
            show_headings={true}
            show_pagination={false}
            showSearch={false}
            show_toolbar={false}
            className="bg-white/95"
          />
        </div>
      </section>
    </>
  );
}
