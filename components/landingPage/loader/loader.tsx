'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Loader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (showLoader) {
        return (
            <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white/90 z-50">
                <Image
                    src="/assets/logo.svg"
                    alt="loader logo"
                    height={200}
                    width={200}
                    className="animate-zoom"
                />
            </div>
        );
    }
    return <>{children}</>;
};

export default Loader;