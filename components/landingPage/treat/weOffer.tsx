import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const WhatWeOffer = () => {
    return (
        <div className="bg-gray-100 py-10">
            <div className="flex flex-col md:flex-row items-center justify-center mb-10 mx-5">
                <div className="md:bg-white md:p-8 w-full md:w-1/2 relative z-10 md:pt-20 md:ml-10">
                    <h2 className="md:text-2xl text-xl font-bold text-purple-1 mb-4">Hypertension</h2>
                    <p className="text-blue-1 text-xs md:text-sm mb-6 md:pr-20">
                        Managing high blood pressure begins with proper care. Our expert team offers personalized plans to keep you healthy and in control. We take a comprehensive approach to your health by not only addressing your immediate condition but also considering your long-term wellness. Our specialists work closely with you, reviewing your medical history, current lifestyle, and treatment options to develop a plan that fits your unique needs. Through ongoing virtual consultations, our healthcare professionals monitor your progress, making adjustments as needed to ensure your treatment remains effective.
                    </p>
                    <Link href="/auth/login">
                        <Button variant='ocx1'>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-[-100px] z-20">
                    <Image
                        src="/assets/offer3.svg"
                        alt="Doctor consulting patient"
                        width={600}
                        height={300}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center mb-10 mx-5">
                <div className="md:bg-white md:p-8 w-full md:w-1/2 relative z-10 md:py-20 md:ml-10">
                    <h2 className="text-2xl font-bold text-purple-1 mb-4">Diabetics Management</h2>
                    <p className="text-blue-1 text-xs md:text-sm mb-6 md:pr-20">
                        Our diabetes treatments focus on managing your condition, improving your quality of life, and maintaining your well-being. At Dokto, we believe that effective diabetes care goes beyond just managing blood sugar levels. Our dedicated team of specialists works with you to develop proper treatment plans that address your  health, incorporating lifestyle changes, medication, and ongoing support.
                    </p>
                    <Link href="/auth/login">
                        <Button variant='ocx1'>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-[-100px] z-20">
                    <Image
                        src="/assets/offer.svg"
                        alt="Doctor consulting patient"
                        width={600}
                        height={400}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center mb-10 mx-5">
                <div className="md:bg-white md:p-8 w-full md:w-1/2 relative z-10 md:py-20 py-10 md:ml-10">
                    <h2 className="text-2xl font-bold text-purple-1 mb-4">Weight-Loss Program</h2>
                    <p className="text-blue-1 text-xs md:text-sm mb-6 md:pr-20">
                        Our weight-loss program provides coaching to help you achieve your goals and experience long-term results. We understand that every individual’s journey is unique, and that's why we tailor our approach to fit your lifestyle, preferences, and health needs. Our expert team works with you to create a sustainable plan that focuses not just on losing weight, but also on maintaining your results and improving your well-being.
                    </p>
                    <Link href="/auth/login">
                        <Button variant='ocx1'>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-[-100px] z-20">
                    <Image
                        src="/assets/offer1.svg"
                        alt="Doctor consulting patient"
                        width={600}
                        height={400}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center mb-10 mx-5">
                <div className="md:bg-white md:p-8 w-full md:w-1/2 relative z-10 md:py-20 py-10 md:ml-10">
                    <h2 className="text-2xl font-bold text-purple-1 mb-4">Healthcare Specialist</h2>
                    <p className="text-blue-1 text-xs md:text-sm mb-6 md:pr-20">
                        Get access to the best healthcare experts in world. They are here to assist and  ensure your health is in order. With a team of professionals at your service, you can trust that your well-being is our top priority. Whether you need guidance, treatment, or ongoing care, we are committed to delivering personalized solutions that keep you healthy and thriving.
                    </p>
                    <Link href="/auth/login">
                        <Button variant='ocx1'>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-[-100px] z-20">
                    <Image
                        src="/assets/offer2.svg"
                        alt="Doctor consulting patient"
                        width={600}
                        height={400}
                    />
                </div>
            </div>
        </div>
    )
}

export default WhatWeOffer
