import React from 'react';
import Image from 'next/image';
import Title2 from '../title/title2';

const StreamlineAppointments = () => {
    return (
        <div className="px-6 md:px-16 bg-purple-5">
            <Title2 h1Text="GENERAL HEADING" h2Text="Streamline Your Online Appointments" />

            <div className="flex flex-col md:gap-4 gap-2 mt-10 md:flex-row">
                <div className="relative flex-1 overflow-hidden rounded-2xl">
                    <Image
                        src="/assets/streamline1.svg"
                        alt="Large image"
                        height={400}
                        width={400}
                        className="w-full h-full"
                    />
                </div>

                <div className="flex flex-row md:gap-4 gap-2 flex-1">
                    <div className="relative w-full overflow-hidden rounded-2xl">
                        <Image
                            src="/assets/streamline2.svg"
                            alt="Small image 1"
                            height={400}
                            width={400}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="relative w-full overflow-hidden rounded-2xl">
                        <Image
                            src="/assets/streamline3.svg"
                            alt="Small image 2"
                            height={400}
                            width={400}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-10 md:mt-4 mt-2 md:flex-row">
                <div className="flex flex-row gap-2 md:gap-4 flex-1">
                    <div className="relative w-full overflow-hidden rounded-2xl">
                        <Image
                            src="/assets/streamline4.svg"
                            alt="Small image 1"
                            height={400}
                            width={400}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="relative w-full overflow-hidden rounded-2xl">
                        <Image
                            src="/assets/streamline5.svg"
                            alt="Small image 2"
                            height={400}
                            width={400}
                            className="w-full h-full"
                        />
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-2xl">
                    <Image
                        src="/assets/streamline6.svg"
                        alt="Large image"
                        height={400}
                        width={400}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default StreamlineAppointments;
