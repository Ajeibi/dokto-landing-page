import SubscriptionPlan from '@/components/landingPage/home/subscription';
import Testimonials from '@/components/landingPage/home/testimonials';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <>
            <section className="relative h-[100vh] flex items-center overflow-hidden">
                <div className="flex flex-col md:flex-row items-stretch justify-between w-full h-full">
                    <div className="w-full md:w-1/2 z-10 md:text-left md:px-10 flex flex-col justify-center h-full text-center items-center md:items-start">
                        <h1 className="font-sans font-semibold text-2xl md:text-[50px]/[70px] mb-5 text-center md:text-left">
                            Online doctor you can afford: our doctor, one tap away
                        </h1>
                        <p className="text-sm md:text-blue-2 text-blue-1 text-center md:text-left">
                            Your health is our priority, and with just one tap, you can connect with a doctor who truly understands you. Take control of your health.
                        </p>
                        <div className="flex gap-3 mt-5">
                            <Link href="/auth/login?redirect=/appointment">
                                <Button variant='ocx1'>
                                    Book an appointment
                                </Button>
                            </Link>
                            <Link href="/auth/login?redirect=/prescription">
                                <Button variant="ocx">
                                    Prescription Refill
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 relative bg-purple-4 items-center justify-end h-full hidden md:block">
                        <div className="w-full h-full flex justify-end">
                            <Image
                                src="/assets/pricingHero.svg"
                                alt="Hero Image"
                                height={500}
                                width={500}
                                className="object-right"
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/assets/hero.svg')` }}>
                    <div className="absolute inset-0 bg-white bg-opacity-40"></div>
                </div>
            </section>
            <SubscriptionPlan />
            <Testimonials />
        </>
    );
};

export default HeroSection;
