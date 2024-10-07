import React from 'react';
import Image from 'next/image';
import { Button } from '../../ui/button';
import Link from 'next/link';

const RefillPrescription = () => {
    return (
        <div
            className="relative bg-purple-5 bg-cover bg-no-repeat bg-center flex justify-center items-center min-h-screen md:bg-[url('/assets/bg_gradient.svg')]"
        >
            <div className="absolute inset-0 z-10">
                <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-white to-transparent opacity-95"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white to-transparent opacity-95"></div>
            </div>
            <Image
                src="/assets/Group3.svg"
                alt="Left decoration"
                width={150}
                height={100}
                className="absolute left-0 top-0 h-full object-cover py-[60px]"
            />

            <Image
                src="/assets/Group2.svg"
                alt="Right decoration"
                width={150}
                height={100}
                className="absolute right-0 top-0 h-full object-cover py-[60px]"
            />

            <div className="md:bg-white rounded-lg flex md:flex-row flex-col items-center md:max-w-4xl max-w-sm lg:my-20 z-10 relative overflow-hidden md:overflow-visible">
                <div className="md:w-1/2 relative">
                    <Image
                        src="/assets/fill.svg"
                        alt="Prescription"
                        width={400}
                        height={400}
                    />
                    <Image
                        src="/assets/drWilliams.svg"
                        alt="Doctor"
                        width={300}
                        height={300}
                        className="absolute -bottom-5 md:-left-12 -right-10  bg-white rounded-lg pr-12"
                    />
                </div>
                <div className="md:w-1/2 lg:first:pr-10 max-sm:justify-center max-sm:text-center">
                    <h2 className="text-base md:text-xl font-bold md:font-medium font-sans text-purple-7 mt-10 md:mt-0 mb-5 md:mb-[32px]">
                        Fill, Refill Prescription by subscribing for a membership
                    </h2>
                    <p className="text-sm md:mb-20 mb-5 md:pr-5">
                        Subscribe and become a member of Dokto family for a fee that covers both your prescriptions and consultations. Consulting with a doctor online is more affordable than an in-person visit.
                    </p>
                    <Link href="/auth/login?redirect=/prescription">
                        <Button variant="ocx1">
                            Prescription Refill
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RefillPrescription;
