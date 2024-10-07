import React from 'react';
import Image from 'next/image';
import { Button } from '../../ui/button';
import Link from 'next/link';

const MeetDoctors = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-start items-center justify-between lg:px-16 md:px-10 px-5 md:py-12 py-5 bg-purple-5">
            <div className="flex-1 md:pr-12 text-center md:text-left">
                <h2 className="lg:text-2xl md:text-base text-sm font-semibold mb-4">
                    <span className="text-purple-1">Meet Doctors Within the US Virtually For</span> Your Online Appointments & Prescriptions Managements
                </h2>
                <p className="text-xs md:text-sm font-normal mb-6">
                    Meet doctors within the US virtually for your virtual appointments and monthly prescription. Get your consultations and prescriptions from the comfort of your home without the stress of physical appointments.
                </p>
                <Link href="/auth/login?redirect=/appointment">
                    <Button variant="ocx1">
                        Book An Appointment
                    </Button>
                </Link>
            </div>

            <div className="relative flex-1 flex items-start justify-center md:pl-[190px] pl-[160px] md:mt-0 mt-10">
                <Image
                    src="/assets/iPhone_12_Pro.svg"
                    alt="Phone showing virtual doctor appointment"
                    width={300}
                    height={200}
                    className="relative"
                />
                <Image
                    src="/assets/meet.svg"
                    alt="Doctor consultation"
                    width={250}
                    height={100}
                    className="absolute bottom-4 md:left-[170px] right-[100px]"
                />
            </div>
        </div>

    );
};

export default MeetDoctors;