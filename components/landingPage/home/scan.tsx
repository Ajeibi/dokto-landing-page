import React from 'react';
import Image from 'next/image';

const ScanCode = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row md:items-start items-center justify-between lg:px-16 md:px-10 px-5 md:py-12 py-5 bg-purple-5">
            <div className="relative flex-1 flex items-start justify-center">
                <Image
                    src="/assets/meetGroup.svg"
                    alt="Phone showing virtual doctor appointment"
                    width={400}
                    height={400}
                    className="relative"
                />
            </div>
            <div className="flex-1 md:pr-12 text-center md:text-left">
                <h2 className="lg:text-2xl md:text-base text-sm font-semibold mb-4">
                    Scan the QR code/ click URL to <span className="text-purple-1">meet your preferred Doctors</span>
                </h2>
                <p className="text-xs md:text-sm font-normal mb-10">
                    Scan the unique QR Code or click the URL to  connect with  your preferred Doctor for your medical consultations.
                </p>
            </div>
        </div>
    );
};

export default ScanCode;
