import React from 'react';
import Image from 'next/image';
import Title from '../title/page';

const Services = () => {
    return (
        <div className="px-3 md:px-16 bg-purple-5">
            <Title
                h1Text="GENERAL HEADING"
                h2Text="Our Services"
                pText="It started with a dream and grew into a belief that everyone deserves access to quality healthcare right from the comfort of their home and here is what we do."
            />
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2 my-10">
                <div className="relative lg:h-[290px] lg:w-[290px] overflow-hidden rounded-2xl">
                    <Image
                        src="/assets/services_1.svg"
                        alt="Service 1 image"
                        className='rounded-2xl object-cover h-full w-full'
                        width={500}
                        height={500}
                    />
                </div>

                <div className="font-sans relative lg:h-[280px] lg:w-[290px] border rounded-2xl  overflow-hidden bg-gray-2 p-4">
                    <p className="md:mb-[60px] mb-5 md:text-base text-sm font-semibold">Smoking <br />Cessation</p>
                    <p className="md:mb-[20px] mb-5 text-xs md:text-sm">
                        Smoking increases the risk of exposure to lung cancer and other diseases. Healthy lungs make for a healthier body. Improve your lifestyle with the best therapy there is using Dokto.
                    </p>
                    <p className="text-xs">More Information</p>
                </div>

                <div className="relative lg:h-[290px] lg:w-[290px] overflow-hidden">
                    <Image
                        src="/assets/services_3.svg"
                        alt="Service 3 image"
                        className="rounded-2xl object-cover h-full w-full"
                        width={500}
                        height={500}
                    />
                </div>

                <div className="font-sans relative lg:h-[280px] lg:w-[290px] border rounded-2xl overflow-hidden text-white bg-blue-1 p-4">
                    <p className="md:mb-[64px] mb-5 md:text-base text-sm font-semibold">Alcohol <br />Abuse</p>
                    <p className="md:mb-[53px] mb-[50px] text-xs md:text-sm">
                        Are you struggling with alcohol abuse? You are not alone, help is available. Begin your journey now to recovery.
                    </p>
                    <p className="text-xs">More Information</p>
                </div>

                <div className="font-sans relative lg:h-[280px] lg:w-[290px] border rounded-2xl  overflow-hidden text-white bg-purple-2 p-4">
                    <p className="md:mb-[64px] mb-5 md:text-base text-sm font-semibold">Weight-Loss<br />Program</p>
                    <p className="md:mb-[20px] mb-[50px] text-xs md:text-sm">
                        Our trusted weight program helps you achieve your fitness goal, keeps your body in track and builds your immune system.
                    </p>
                    <p className="h-[20px] w-[98px] text-xs">More Information</p>
                </div>

                <div className="relative lg:h-[290px] lg:w-[290px] rounded-2xl overflow-hidden">
                    <Image
                        src="/assets/services_6.svg"
                        alt="Service 6 image"
                        className="rounded-lg object-cover h-full w-full"
                        width={500}
                        height={500}
                    />
                </div>

                <div className="font-sans relative lg:h-[280px] lg:w-[290px] border rounded-2xl overflow-hidden bg-gray-2 p-4">
                    <p className="md:mb-[64px] mb-5 md:text-base text-sm font-semibold">Healthcare <br />Specialists</p>
                    <p className="md:mb-[20px] mb-[30px] text-xs md:text-sm">
                        Meet our line up of trusted healthcare specialist  who are ready to deliver the best medical services to everybody who deserves it, including you.
                    </p>
                    <p className="h-[20px] w-[98px] text-xs">More Information</p>
                </div>

                <div className="relative lg:h-[290px] lg:w-[290px] overflow-hidden">
                    <Image
                        src="/assets/services_8.svg"
                        alt="Service 8 image"
                        className="rounded-lg object-cover h-full w-full"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default Services;