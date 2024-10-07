import Testimonials from '@/components/landingPage/home/testimonials';
import QualityExperts from '@/components/landingPage/treat/qualityExperts';
import WhatWeOffer from '@/components/landingPage/treat/weOffer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const WhatWeTreat = () => {
    return (
        <>
            <section className="bg-purple-1 py-16">
                <div className="flex flex-col md:flex-row items-center md:gap-10 md:mx-20 mx-5 text-center">
                    <div className="text-left md:w-[60%] text-white">
                        <h1 className="md:text-[50px]/[70px] text-2xl font-semibold text-center md:text-left">
                            Good Health, just a click away:  Get back to feeling better
                        </h1>
                        <p className="md:text-sm text-xs mt-4 text-center md:text-left">
                            Get access to the best medical services ranging from video conferencing with the best doctors, scheduled appointments, and to getting accurate prescriptions in the simplest way possible at Dokto.
                        </p>
                        <div className='flex gap-5 mt-10'>
                            <Link href="/auth/login?redirect=/appointment">
                                <Button className='bg-white text-purple-1 hover:bg-white hover:text-purple-1'>
                                    Book an appointment
                                </Button>
                            </Link>
                            <Link href='/auth/login?redirect=/prescription'>
                                <Button className='bg-transparent border border-white text-white hover:bg-transparent hover:text-white'>
                                    Prescription Refill
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-[40%] mt-8 md:mt-0">
                        <Image
                            src="/assets/treat.svg"
                            alt="Hero Image"
                            width={500}
                            height={400}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                <div className="md:mx-10 py-10">
                    <h2 className="text-lg font-normal text-white text-center md:text-left mb-5">
                        EXPLORE OUR AMAZING SERVICES
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4 max-sm:mx-5">
                        <div>
                            <Image
                                src="/assets/hypertension.svg"
                                alt="Grid Image 1"
                                width={300}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <Image
                                src="/assets/diabetics.svg"
                                alt="Grid Image 2"
                                width={300}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <Image
                                src="/assets/weightloss.svg"
                                alt="Grid Image 3"
                                width={300}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <Image
                                src="/assets/healthcare.svg"
                                alt="Grid Image 4"
                                width={300}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <QualityExperts />
                <WhatWeOffer />
                <Testimonials />
            </section>
        </>
    );
};

export default WhatWeTreat;
