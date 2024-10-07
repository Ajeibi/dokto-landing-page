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

export default function SubscriptionPending({
  open,
  onOpenChange,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 max-w-xl">
        <Icons.pendingIcon className="mx-auto mt-8 mb-5" />

        <DialogHeader className="space-y-2 *:text-center mb-8 md:mb-9">
          <DialogTitle className="font-medium  text-sm md:text-base">
            Payment Pending
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-text-subtle">
            {" "}
            Your subscription plan for the account name Dawn Mbang is pending.
            The recipient will be credited within 5 minutes after your wallet is
            funded.
          </DialogDescription>
        </DialogHeader>

        <Button className="w-full" asChild>
          <Link href={"/dashboard/overview"}>Okay</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
