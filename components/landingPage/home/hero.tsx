'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
    const [isSmallDevice, setIsSmallDevice] = useState(false);

    useEffect(() => {
        const updateBackgroundStyles = () => {
            if (window.innerWidth < 768) {
                setIsSmallDevice(true);
            } else {
                setIsSmallDevice(false);
            }
        };

        updateBackgroundStyles();
        window.addEventListener('resize', updateBackgroundStyles);
        return () => window.removeEventListener('resize', updateBackgroundStyles);
    }, []);

    return (
        <div
            className="relative flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden bg-no-repeat bg-center min-h-screen"
            style={{
                backgroundImage: !isSmallDevice
                    ? "linear-gradient(to right, white 0%, white 45%, transparent 70%), url('/assets/hero.svg')"
                    : "url('/assets/hero.svg')",
                backgroundSize: !isSmallDevice ? 'contain' : 'cover',
                backgroundPosition: !isSmallDevice ? 'center right' : 'center',
            }}
        >
            {isSmallDevice && (
                <div className="absolute inset-0 bg-white opacity-40 pointer-events-none"></div>
            )}

            <div className="relative z-20 px-10 md:w-55 md:pl-16 md:pr-8 flex flex-col items-center justify-center md:items-start md:justify-start max-w-[700px]">
                <h1 className="font-sans font-semibold text-2xl md:text-[50px]/[70px] mb-5 text-center md:text-left">
                    Good Health, just a click away: <span className="text-purple-1">Get back to feeling better</span>
                </h1>
                <p className="text-sm md:text-blue-2 text-blue-1 text-center md:text-left">
                    Get access to the best medical services ranging from video conferencing with the best doctors, scheduled
                    appointments, and to getting accurate prescriptions in the simplest way possible at Dokto.
                </p>
                <div className="flex gap-3 mt-5">
                    <Link href="/auth/login?redirect=/appointment">
                        <Button variant='ocx1'>
                            Book an appointment
                        </Button>
                    </Link>
                    <Link href="/auth/login?redirect=/prescription">
                        <Button variant="ocx">
                            Prescription Refill
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Hero;