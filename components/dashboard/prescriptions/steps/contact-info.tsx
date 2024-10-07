import React from "react";
import { RefillStepsProps } from "./types";
import Paragraph from "@/components/ui/typography/paragraph";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { usePrescriptionRefill } from "../context";
import { useWhoAmI } from "@/api/auth/whoami";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading";

export function ContactInformation({ setStep }: RefillStepsProps) {
  const { value, setValue } = usePrescriptionRefill();
  const { data, isLoading } = useWhoAmI();

  const [info, setInfo] = React.useState({
    name: "",
    dob: "",
    address: "",
    phone: "",
  });

  React.useEffect(() => {
    setInfo({
      name: `${data?.firstName} ${data?.lastName}`,
      dob: `${data?.dateOfBirth}`,
      address: `${data?.location?.apartmentNo}, ${data?.location?.city}, ${data?.location?.state}`,
      phone: `${data?.phone}`,
    });
  }, [data?._id]);

  function onSubmit() {
    setValue({ ...value, contactInfo: info });
    setStep((prev) => prev + 1);
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="space-y-2.5">
        <Paragraph className="text-text text-sm w-full flex justify-between items-center capitalize">
          <span className="text-[#727A8B]">Patient Name:</span>
          {info?.name || (
            <Input
              className="w-full"
              placeholder="Patient Name"
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
          )}
        </Paragraph>
        <Separator />
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Date of Birth:</span>
          {info?.dob || (
            <Input
              placeholder="Date of Birth"
              type="date"
              onChange={(e) => setInfo({ ...info, dob: e.target.value })}
            />
          )}
        </Paragraph>
        <Separator />
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Address:</span>
          <span className="ml-auto">
            {info?.address || (
              <Input
                placeholder="Enter your Address"
                onBlur={(e) => setInfo({ ...info, address: e.target.value })}
              />
            )}
          </span>
        </Paragraph>
        <Separator />
        <Paragraph className="text-text text-sm w-full flex justify-between items-center">
          <span className="text-[#727A8B]">Phone Number:</span>
          {info?.phone || (
            <Input
              placeholder="Phone Number"
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            />
          )}
        </Paragraph>
        <Separator />
      </div>

      <div className="mt-10 flex">
        <Button className="w-44 ml-auto" onClick={onSubmit}>
          Next
        </Button>
      </div>
    </>
  );
}
