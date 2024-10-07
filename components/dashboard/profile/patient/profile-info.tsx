import { WhoAmIResponse } from "@/api/auth/whoami";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";

export function PatientProfileInfo({ user }: { user: WhoAmIResponse }) {
  return (
    <div className="rounded-2xl bg-white py-4 px-3 md:p-6 space-y-6 md:space-y-8">
      {/* personal info */}
      <div>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Personal Information
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14 capitalize">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">First Name</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.firstName}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Middle Name</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.middleName}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Surname</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.lastName}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Date of Birth</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.dateOfBirth}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Sex</Paragraph>
            <Paragraph className="text-text-sec font-medium uppercase">
              {user?.sex}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* location */}

      <div>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Location
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14 capitalize">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Apartment No</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.location.apartmentNo}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Street Name</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.location.streetName}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">City</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.location.city}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">State</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.location.state}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Zip-code</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.location.zipCode}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* contacts */}
      <div>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Contacts
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Phone Number</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {user?.phone}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Email Address</Paragraph>
            <Paragraph className="text-text-sec font-medium break-words break-all">
              {user?.email}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* allergies */}
      <div>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Allergies
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />
        <div className="flex items-center gap-4 flex-wrap">
          {user && user?.allergies?.length > 0
            ? user?.allergies?.map((allergy, index) => (
                <Paragraph
                  key={index}
                  className="bg-[#FAF6FE] h-8 w-[10.875rem] grid place-items-center rounded-sm text-sm text-[#736E8D]"
                >
                  {allergy}
                </Paragraph>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
