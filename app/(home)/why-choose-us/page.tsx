import Testimonials from '@/components/landingPage/home/testimonials'
import WhyDokto from '@/components/landingPage/treat/WhyDokto'
import React from 'react'

const WhyChooseUs = () => {
    return (
        <>
            <div className="relative bg-cover bg-center md:h-[700px] h-[400px] text-white"
                style={{ backgroundImage: 'url(/assets/whyChoose.svg)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <h2 className="md:text-4xl text-2xl font-bold mb-4 font-sans">Why Choose Us</h2>
                    <p className="max-w-2xl text-sm md:text-base font-sans">
                        We believe in a future where exceptional healthcare is just a click away for everyone, ensuring that your health is never compromised, no matter your location.
                    </p>
                </div>
            </div>
            <section>
                <WhyDokto />
                <Testimonials />
            </section>
        </>
    )
}

export default WhyChooseUs