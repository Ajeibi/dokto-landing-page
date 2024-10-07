import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const WhyDokto = () => {
    return (
        <>
            <div className='md:mx-20 mx-5 my-16 md:my-[100px]'>
                <div className="flex flex-col md:flex-row justify-between w-full my-16">
                    <div className="w-full md:w-[35%] h-full flex">
                        <h2 className="font-sans text-xs md:text-base font-normal text-left text-purple-1">WHY DOKTO?</h2>
                    </div>
                    <div className="w-full md:w-[65%] h-full">
                        <h2 className="font-sans text-lg md:text-2xl font-normal text-purple-1 mb-3">Expert Care at Your Fingertips</h2>
                        <p className='text-blue-1 text-sm mb-7'>
                            Get access to top healthcare professionals without leaving your house. Our certified doctors and specialists are available 24/7 to give proper expert care around the clock.
                        </p>
                        <Link href="/auth/login?redirect=/appointment">
                            <Button variant='ocx1'>
                                Book an appointment
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full md:gap-0 gap-3">
                    <div className="md:w-[35%] h-full flex items-center justify-center">
                        <Image
                            src="/assets/why1.svg"
                            alt="Left Image"
                            width={380}
                            height={300}
                        />
                    </div>
                    <div className="md:w-[65%] flex">
                        <Image
                            src="/assets/why2.svg"
                            alt="Right Image"
                            width={800}
                            height={300}
                        />
                    </div>
                </div>
            </div>
            <section className='py-10 bg-gray-100'>
                <div className="md:mx-16 mx-5 md:py-10">
                    <div className="text-left mb-5">
                        <h3 className="md:text-2xl text-base font-medium text-black mb-5">Expert Doctors</h3>
                        <Image
                            src="/assets/sec.svg"
                            alt="Expert Doctor"
                            width={1500}
                            height={1500}
                            className="mx-auto"
                        />
                        <p className="text-xs text-black my-5">
                            Your privacy is our top priority. We understand the importance of protecting your personal health information, which is why our platform uses advanced encryption and cutting-edge security protocols to ensure your data stays confidential and secure at all times. We are not just committed to your health, we are committed to keeping your personal information secure, giving you the peace of mind to focus solely on your well-being.
                        </p>
                    </div>

                    <div className="text-left md:my-20 my-5">
                        <h3 className="md:text-2xl text-base font-medium text-black mb-5">Comprehensive Healthcare Services</h3>
                        <Image
                            src="/assets/sec1.svg"
                            alt="Virtual Care"
                            width={1500}
                            height={1500}
                            className="mx-auto"
                        />
                        <p className="text-xs text-black my-5">
                            We offer a wide range of healthcare services, from routine check-ups to the management of chronic conditions, all from the convenience of our telemedicine platform. Whether it’s preventive care or ongoing treatment, we ensure you receive the right, expert care for your medical needs.
                        </p>
                    </div>

                    <div className="text-left mb-5">
                        <h3 className="md:text-2xl text-base font-medium text-black mb-5">24/7 Access to Medical Professionals</h3>
                        <Image
                            src="/assets/sec2.svg"
                            alt="24/7 Support"
                            width={1500}
                            height={1500}
                            className="mx-auto"
                        />
                        <p className="text-xs text-black my-5">
                            Whether it's a small concern or something more urgent, our team of dedicated medical professionals is here for you, day or night. We understand that health issues don’t follow a schedule, and having access to the right care when you need it most can bring peace of mind. That's why we’re available 24/7 so you can get the answers, advice, and treatment you need without the wait.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyDokto