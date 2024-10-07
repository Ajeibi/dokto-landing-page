"use client";

import { Icons } from "@/components/icons";
import SuccessfulSlotUpdate from "@/components/modals/slots/successful-slot-update";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { dayNames, getAllDaysInMonth, monthNames } from "@/lib/utils";
import React, { useEffect } from "react";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const timeSlots = [
  "07:00am - 07:30am",
  "07:30am - 08:00am",
  "08:00am - 08:30am",
  "09:30am - 10:00am",
  "10:00am - 10:30am",
  "10:30am - 11:00am",
  "11:00am - 11:30am",
  "11:30am - 12:00pm",
  "12:00pm - 12:30pm",
  "12:30pm - 01:00pm",
  "01:00pm - 01:30pm",
  "01:30pm - 02:00pm",
  "02:00pm - 02:30pm",
  "02:30pm - 03:00pm",
  "03:00pm - 03:30pm",
  "03:30pm - 04:00pm",
  "04:00pm - 04:30pm",
  "04:30pm - 05:00pm",
  "05:00pm - 05:30pm",
  "05:30pm - 06:00pm",
  "06:00pm - 06:30pm",
  "06:30pm - 07:00pm",
  "07:00pm - 07:30pm",
  "07:30pm - 08:00pm",
  "08:00pm - 08:30pm",
  "08:30pm - 09:00pm",
  "09:00pm - 09:30pm",
  "09:30pm - 10:00pm",
];

export default function SlotManagementPage() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedSlots, setSelectedSlots] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<string>(
    monthNames[new Date().getMonth()]
  );
  const [year, setYear] = React.useState<number>(new Date().getFullYear());

  const handleSlotClick = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  function handleSlotsUpdate() {
    // if(!selectedDate) return;

    setOpen(true);
  }

  useEffect(() => {
    setMonth(monthNames[selectedDate.getMonth()]);
    setYear(selectedDate.getFullYear());
  }, [selectedDate]);

  return (
    <>
      <section className="flex gap-6 flex-col lg:flex-row max-w-7xl mx-auto">
        <div className="flex lg:flex-[30%] flex-col rounded-2xl bg-white py-4 px-3 md:p-5 gap-6 relative">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(val) => {
              val && setSelectedDate(val);
            }}
            disabled={(date) =>
              date < (new Date().setHours(0, 0, 0, 0) as unknown as Date)
            }
            classNames={{
              month: "sm:space-x-0 sm:gap-x-4 w-full",
              head_row: "w-full flex items-center justify-between mt-5",
              table: "w-full flex flex-col gap-5",
              row: "w-full flex items-center justify-center",
              cell: "w-full",
              nav: "absolute top-5 right-5 flex items-center justify-between *:relative w-20",
              caption: "text-left",
            }}
            className="p-0 w-full"
          />
        </div>

        <div className="flex lg:flex-[70%] rounded-2xl bg-white flex-col gap-4 py-4 px-3 md:p-5">
          <div className="w-full">
            <div className="flex items-center flex-wrap justify-between">
              <div className="space-y-1">
                <Paragraph className="text-sm text-text-subtle">Date</Paragraph>
                <p className="text-lg md:text-xl text-primary">
                  {`${
                    dayNames[selectedDate.getDay()]
                  }, ${selectedDate.getDate()} ${month} ${year}`}
                </p>
              </div>
              <Button onClick={handleSlotsUpdate}>Update Time</Button>
            </div>
            <Separator className="my-4" />
            <Paragraph className="text-sm text-text-sec  mb-10">
              Please select a convenient time and click "Update Time" to save
              your changes. You can also deselect a previously chosen time to
              remove it from your available slots.
            </Paragraph>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-10">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={` text-[10px] min[360px]:text-xs hover:bg-[#035370] hover:text-white ${
                      selectedSlots.includes(slot)
                        ? "bg-[#035370] text-white"
                        : ""
                    }`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SuccessfulSlotUpdate open={open} onOpenChange={setOpen} />
    </>
  );
}
