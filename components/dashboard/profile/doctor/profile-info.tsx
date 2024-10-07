import { WhoAmIResponse } from "@/api/auth/whoami";
import { Separator } from "@/components/ui/separator";
import Paragraph from "@/components/ui/typography/paragraph";

export function DoctorProfileInfo({
  user,
  refs: { personalInfo, address, contacts, languages, license },
}: {
  user: WhoAmIResponse;
  refs: {
    personalInfo: React.RefObject<HTMLDivElement>;
    address: React.RefObject<HTMLDivElement>;
    contacts: React.RefObject<HTMLDivElement>;
    languages: React.RefObject<HTMLDivElement>;
    license: React.RefObject<HTMLDivElement>;
  };
}) {
  const getValueOrNA = (value: Date | string | number | undefined | null): string => {
    if (!value) {
      return "N/A";
    }
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    return value.toString();
  };


  return (
    <div className="rounded-2xl bg-white py-4 px-3 md:p-6 space-y-6 md:space-y-8">
      {/* personal info */}
      <div ref={personalInfo}>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Personal Information
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14 capitalize">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">First Name</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {getValueOrNA(user?.firstName)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Middle Name</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {getValueOrNA(user?.middleName)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Surname</Paragraph>
            <Paragraph className="text-text-sec font-medium">
              {getValueOrNA(user?.lastName)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Date of Birth</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.dateOfBirth)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Sex</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.sex)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Specialization</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.speciality)}
            </Paragraph>
          </div>
        </div>
        <div className="space-y-2">
          <Paragraph className="text-text-subtle mt-14">Bio</Paragraph>
          <Paragraph className="text-text-sec font-normal text-sm">
            {getValueOrNA(user?.bio)}
          </Paragraph>
        </div>
      </div>

      {/* address */}
      <div ref={address}>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Address
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14 capitalize">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Street Name</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.streetName)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">City</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.city)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">State</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.state)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Zip-Code</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.zipCode)}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* contacts */}
      <div ref={contacts}>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Contacts
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14 capitalize">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Email</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.email)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Phone</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.phone)}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* language */}
      <div ref={languages}>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Languages
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14 capitalize">
          <div className="flex items-center gap-4 flex-wrap">
            {user && user?.languages?.length > 0
              ? user?.languages?.map((lang, index) => (
                <Paragraph
                  key={index}
                  className="bg-[#FAF6FE] h-8 px-5 grid place-items-center rounded-sm text-sm text-[#736E8D]"
                >
                  {lang}
                </Paragraph>
              ))
              : "N/A"}
          </div>
        </div>
      </div>

      {/* license */}
      <div ref={license}>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          License
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14 capitalize">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Licensed State</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.licenseState)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Licensed No.</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.licenseNumber)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Date of Expiration</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.dateOfExpiration)}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">NPI No.</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {getValueOrNA(user?.npiNumber)}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Status */}
      {/* <div>
        <Paragraph className="text-sm md:text-base text-[#3f2464]">
          Status
        </Paragraph>
        <Separator className="mt-2 mb-4 md:mt-3 md:mb-6" />

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 gap-14">
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Available</Paragraph>
            <Paragraph className="text-text-sec font-medium text-sm">
              {user.isAvailable ? "Yes" : "No"}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <Paragraph className="text-text-subtle">Consultation Fee</Paragraph>
            <Paragraph className="text-text-sec font-medium break-words break-all">
              {getValueOrNA(user?.consultationFee)}
            </Paragraph>
          </div>
        </div>
      </div> */}
    </div>
  );
}