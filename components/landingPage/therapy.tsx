'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

const Therapy = () => {
    const [isSmallDevice, setIsSmallDevice] = useState(false);

    useEffect(() => {
        const updateDeviceSize = () => {
            setIsSmallDevice(window.innerWidth < 768);
        };

        updateDeviceSize();
        window.addEventListener('resize', updateDeviceSize);
        return () => window.removeEventListener('resize', updateDeviceSize);
    }, []);

    return (
        <div
            className={`relative w-full h-[500px] ${isSmallDevice ? 'flex flex-col items-center justify-center bg-cover bg-center' : ''}`}
            style={{
                backgroundImage: isSmallDevice ? "url('/assets/therapy.svg')" : 'none',
            }}
        >
            {!isSmallDevice && (
                <Image
                    src="/assets/therapy.svg"
                    alt="Therapy"
                    height={500}
                    width={500}
                    className="w-full h-full"
                />
            )}

            <div className="absolute inset-0 z-10">
                <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-purple-4 to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-purple-4 to-transparent opacity-90"></div>
            </div>

            <div
                className={`absolute inset-0 ${isSmallDevice ? 'z-20 px-10 flex flex-col items-start justify-center bg-purple-1 bg-opacity-20' :
                    'left-0 top-0 h-full w-1/2 bg-purple-4 rounded-r-2xl bg-opacity-90 p-6 md:py-12 md:pl-12 flex items-center z-20'}`}
            >
                <div className={`${isSmallDevice ? 'max-w-full text-center' : 'max-w-[550px]'}`}>
                    <h1 className="font-sans font-bold text-2xl md:text-4xl mb-4 md:text-purple-1 text-purple-3">Mental Health & Therapy</h1>
                    <p className="text-sm md:text-base text-white md:text-blue-2  md:mb-10">
                        Get the right mental support and therapy from the best team on your rehabilitation journey. With our trusted team of specialists, you are well on your way to getting back perfect health.
                    </p>
                    <Link href='/auth/login'>
                        <Button variant="ocx1" className='md:mt-0 mt-5'>Get Started</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Therapy;