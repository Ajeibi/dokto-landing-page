import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Title from '../title/page';
import { APPOINTMENT_LINKS } from '@/constants';
import { Button } from '../../ui/button';

const Appointments = () => {
    return (
        <div className="px-6 md:px-16 bg-purple-5 py-10">
            <Title
                h1Text="GENERAL HEADING"
                h2Text="Streamline Your Online Appointments & Prescriptions Made Simple"
                pText=""
            />

            <div className="flex flex-wrap justify-center items-center lg:gap-4 gap-2 mt-6 text-sm max-w-[800px] mx-auto">
                {APPOINTMENT_LINKS.map((link, index) => (
                    <Link
                        key={index}
                        href='/auth/login'
                        className={`px-4 py-2 border-b-2 font-sans text-xs ${link.label === "General Aliment"
                            ? 'border-purple-700 text-purple-700'
                            : 'border-transparent'
                            } hover:border-purple-700`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>


            <div className="mt-10 flex flex-col md:flex-row  gap-3 items-start">
                <div className="flex flex-1 gap-4">
                    <Image
                        src="/assets/aliment.svg"
                        alt="Grouped images"
                        width={500}
                        height={300}
                    />
                </div>
                <div className="flex-1 lg:pt-10">
                    <h3 className="md:text-2xl text-lg font-medium font-sans mb-[15px] md:mb-[20px]">General Aliment</h3>
                    <p className="text-sm mb-6 text-blue-2">
                        Life comes with its share of bumps and bruises, but you don’t have to face them alone. Our treatments are focused on giving you relief in a way that fits seamlessly into your day. No matter the ailment, we work with you to create a plan that’s simple and easy to follow, so you can get back to what matters most.
                    </p>
                    <Button variant="ocx1">
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Appointments;