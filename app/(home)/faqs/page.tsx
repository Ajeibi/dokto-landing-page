import { FAQAccordion } from '@/components/landingPage/faqs/faq'
import Testimonials from '@/components/landingPage/home/testimonials'
import React from 'react'

const Faqs = () => {
    return (
        <>
            <div className='relative bg-cover bg-center md:h-[700px] h-[400px] text-white'
                style={{ backgroundImage: 'url(/assets/whyChoose.svg)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <h2 className="md:text-[50px]/[70px] text-2xl font-bold mb-4 font-sans max-w-[750px]">Good Health, just a click away:  Get back to feeling better</h2>
                    <p className="max-w-3xl text-sm md:text-base font-sans">
                        Get access to the best medical services ranging from video conferencing with the best doctors, scheduled appointments, and to getting accurate prescriptions in the simplest way possible at Dokto.
                    </p>
                </div>
            </div>
            <FAQAccordion />
            <Testimonials />
        </>
    )
}

export default Faqs
