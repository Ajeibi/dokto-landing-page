import { Button } from "@/components/ui/button";
import Paragraph from "@/components/ui/typography/paragraph";
import { useUser } from "@/context/user";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const { User } = useUser();

  return (
    <div className="bg-hero-pattern min-h-[248px] bg-cover bg-no-repeat bg-center flex justify-between w-full">
      <div className="flex flex-col px-4 md:px-8 py-7">
        <div className="mb-8">
          <Paragraph className="text-[#59338F] font-medium text-xl capitalize pb-3">
            Welcome, {User?.firstName} {User?.lastName} 👋
          </Paragraph>

          <Paragraph className="text-[#0B0B0B] font-medium text-xl  pb-2">
            Need to find a doctor? Get best online treatment at home.
          </Paragraph>

          <Paragraph className="text-[#4F5E71] text-opacity-80 font-normal text-sm ">
            Connect with our expert consultants for accurate diagnosis and
            prescriptions required. Your health is our priority.
          </Paragraph>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Button asChild className="px-8 py-2">
            <Link href={"appointment/doctors"}>Book Appointment</Link>
          </Button>
          <Button asChild variant="outline" className="px-8 py-2 text-primary">
            <Link href={"prescription?tab=request"}>Prescription Request</Link>
          </Button>
        </div>
      </div>

      <div className="mr-12 hidden lg:block">
        <Image src="/heroImg.png" alt="hero image" width={320} height={235} />
      </div>
    </div>
  );
};

export default Hero;
