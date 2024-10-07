import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@/lib/generic-types";
import Link from "next/link";

export default function SubscriptionSuccessful({
  onOpenChange,
  open,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 max-w-xl">
        <Icons.successTick className="mb-5 mt-8 mx-auto" />

        <DialogHeader className="space-y-2 *:text-center mb-8 md:mb-9">
          <DialogTitle className="font-medium  text-sm md:text-base">
            Subscription Fee Approved
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-text-subtle ">
            You have successfully paid $20 for a 1-month membership plan, which
            is valid for 30 days. Please check your payment screen for more
            details.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full *:w-full flex items-center gap-5">
          <Button variant={"outline"}>Close</Button>

          <Button className="w-full" asChild>
            <Link href={"/dashboard/overview"}>Dashboard</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
