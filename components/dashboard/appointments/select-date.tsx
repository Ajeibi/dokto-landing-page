"use client";

import { TDoctorInfo } from "@/api/dashboard/doctors/types";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getAllDaysInMonth, monthNames } from "@/lib/utils";
import * as React from "react";
import { BookAppointmentModal } from "./book-appointment";

export default function DoctorAvailability({
  props,
  openModal,
  setOpenModal,
}: {
  props: TDoctorInfo;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (!isDesktop) {
    return (
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader className="mb-10 hidden">
            <DialogTitle>Doctor’s Available Date and Time</DialogTitle>
            <DialogDescription>
              Schedule an appointment with the your Doctor at your preferred
              time and date.
            </DialogDescription>
          </DialogHeader>
          <SelectAppointmentDate {...props} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <section className="max-w-[26.375rem] hidden xl:flex w-full flex-col">
      <SelectAppointmentDate {...props} />
    </section>
  );
}

const SelectAppointmentDate = (props: TDoctorInfo) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const [openAppointment, setOpenAppointment] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handlePreviousMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const daysInAMonth = getAllDaysInMonth(currentDate);

  const times = [
    { time: "12:00", available: true },
    { time: "13:00", available: false },
    { time: "13:30", available: true },
    { time: "15:00", available: false },
    { time: "16:00", available: false },
  ];

  const initiateAppointment = () => {
    setOpenAppointment(true);
  };

  // scroll to current date
  React.useEffect(() => {
    const scrollArea = scrollRef.current;

    if (scrollArea) {
      const scrollPos =
        scrollArea.scrollWidth * (currentDate.getDate() / daysInAMonth.length);

      scrollArea.scrollTo({ left: scrollPos - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {isDesktop && (
        <div className="mb-10">
          <Paragraph className="font-medium text-sm text-text mb-2">
            Doctor’s Available Date and Time
          </Paragraph>
          <Paragraph className="text-text-subtle text-xs">
            Schedule an appointment with the your Doctor at your preferred time
            and date.
          </Paragraph>
        </div>
      )}

      <div className="space-y-5 overflow-hidden">
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" onClick={() => handlePreviousMonth()}>
            <Icons.chevronLeftIcon className="w-4 h-4 *:fill-text-sec" />
          </Button>
          <div className="text-base font-normal text-text">
            {`${month}, ${year}`}
          </div>
          <Button variant="ghost" onClick={() => handleNextMonth()}>
            <Icons.chevronRightIcon className="w-4 h-4 *:fill-text-sec" />
          </Button>
        </div>

        <div
          className="flex items-center pr-5 pb-1 overflow-x-scroll w-full hide-scrollbar"
          ref={scrollRef}
        >
          {daysInAMonth.map((item) => {
            const today = new Date();
            const isPastDate = item.date < today;
            const isToday = item.date.toDateString() === today.toDateString();

            return (
              <Button
                className="flex flex-col items-center gap-2 cursor-pointer ml-5 p-0 disabled:cursor-not-allowed"
                key={item.date.toString()}
                onClick={() => setSelectedDate(item.date)}
                disabled={isPastDate && !isToday} // Disable past dates except for the selected one
                variant="ghost"
              >
                <span className="text-sm font-normal text-[#B1B1B1]">
                  {item.day}
                </span>

                <div
                  className={`grid place-items-center duration-300 text-sm w-6 h-6 rounded-full ${
                    item.date.toDateString() == selectedDate.toDateString()
                      ? "bg-[#3B008F] text-white"
                      : isToday
                      ? null
                      : isPastDate
                      ? "bg-gray-300"
                      : "text-text"
                  }`}
                >
                  {item.date.getDate()}
                </div>
              </Button>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-5">
          {times.map((slot) => (
            <div
              key={slot.time}
              className={`py-1.5 w-full rounded-full duration-300 grid place-items-center ${
                selectedTime === slot.time
                  ? "bg-primary *:text-white"
                  : slot.available
                  ? "border border-[#E0D6ED] cursor-pointer"
                  : "bg-[#F4F4F480] cursor-not-allowed"
              }`}
              onClick={() => slot.available && setSelectedTime(slot.time)}
            >
              <Paragraph
                className={`text-sm cursor-pointer ${
                  slot.available ? "text-[#1B0040]" : "text-gray-400"
                }`}
              >
                {slot.time}
              </Paragraph>
            </div>
          ))}
        </div>

        <Button
          className="w-full"
          disabled={!selectedTime || !selectedDate}
          onClick={initiateAppointment}
        >
          Book Appointment
        </Button>
      </div>

      <BookAppointmentModal
        open={openAppointment}
        onOpenChange={setOpenAppointment}
        data={{
          ...props,
          appointmentInfo: { date: selectedDate, time: selectedTime },
        }}
      />
    </>
  );
};
