import { Icons } from "@/components/icons";
import Paragraph from "@/components/ui/typography/paragraph";

export function PrescriptionState({ status }: { status: string }) {
  const state = status.toLowerCase();

  return (
    <div
      className={`border px-4 md:px-6 py-3 flex items-center gap-1 rounded-lg ${
        state === "pending"
          ? "bg-[#f4a81c0c] border-[#F4AA1C]"
          : state === "cancelled"
          ? "bg-[#f41c1c0c] border-[#F41C1C]"
          : "bg=[#1CF42E66] border-[#1CF42E]"
      }`}
    >
      <Icons.warningIcon
        fill={
          state === "pending"
            ? "#FFA800"
            : state === "cancelled"
            ? "#FF0000"
            : "#0DB51B"
        }
        className="hidden md:block"
      />

      <Paragraph className="text-xs sm:text-sm leading-[22px] md:leading-5">
        {state === "pending"
          ? "This prescription is still going under approval process and you will be notified when ever an action is taken on it"
          : state === "cancelled"
          ? "This prescription was declined by Dr Jemimiah because it was not the appropriate prescription for your headache. "
          : "This prescription has been approved. Here are the details. To request a refill, use the 'Refill Prescription' button."}
      </Paragraph>
    </div>
  );
}
