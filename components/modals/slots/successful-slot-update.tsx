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

export default function SuccessfulSlotUpdate({
  onOpenChange,
  open,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 max-w-xl">
        <Icons.successTick className="mb-5 mt-8 mx-auto" />

        <DialogHeader className="space-y-2 *:text-center mb-8 md:mb-9">
          <DialogTitle className="font-medium  text-sm md:text-base">
            Successful
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm text-text-subtle ">
            Your available appointment times have been successfully updated.
            You'll receive a notification whenever a patient schedules an
            appointment with you.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full *:w-full flex items-center gap-5">
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
