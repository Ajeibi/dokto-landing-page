import React from 'react'
import Title2 from '../title/title2'
import Image from 'next/image'

const QualityExperts = () => {
    return (
        <div className='md:mx-10 mx-5 md:py-10 py-5 bg-purple-5'>
            <Title2
                h1Text='QUALITY CARE ROUND THE CLOCK'
                h2Text='Our dedicated experts work tirelessly around the clock to ensure you stay in the best of health'
            />
            <section className='grid grid-cols-1 md:grid-cols-3 gap-7 mt-10'>
                <div className='flex flex-col items-center'>
                    <Image
                        src='/assets/expert1.svg'
                        alt='Expert 1'
                        width={500}
                        height={500}
                    />
                    <div className='my-5'>
                        <h3 className='text-base text-purple-1 font-sans mb-3'>Quality Care</h3>
                        <p className='text-sm text-blue-1'>Our experts are here to listen, understand you and provide adequate medical advice where and when it is necessary.</p>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <Image
                        src='/assets/expert2.svg'
                        alt='Expert 2'
                        width={500}
                        height={500}
                    />
                    <div className='my-5'>
                        <h3 className='text-base text-purple-1 font-sans mb-3'>Clinical Expertise</h3>
                        <p className='text-sm text-blue-1'>At Dokto, our experts are equipped to diagnose, treat, and manage your health conditions with precision and care.</p>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <Image
                        src='/assets/expert3.svg'
                        alt='Expert 3'
                        width={500}
                        height={500}
                    />
                    <div className='my-5'>
                        <h3 className='text-base text-purple-1 font-sans mb-3'>Attention to Details</h3>
                        <p className='text-sm text-blue-1'>We  thoroughly review your diagnosis and medical history, efficiently managing time to provide proper care during every virtual appointment.</p>
                    </div>
                </div>
            </section>
            <div className='md:my-10 my-5'>
                <div className='relative'>
                    <div className='absolute top-0 left-0 bg-blue-3 text-white p-4 max-w-[350px] md:block hidden'>
                        <p className='font-normal text-sm'>
                            Our dedicated team is here 24/7 to provide you with the support and attention you deserve. Whether it's a late-night question or an early-morning concern, we're always ready to ensure you receive the best care, whenever you need it.
                        </p>
                    </div>

                    <Image
                        src='/assets/section3.svg'
                        alt='section 3'
                        width={2000}
                        height={2000}
                        className='object-cover'
                    />
                </div>

                <div className='bg-transparent text-black mt-5 max-w-[350px] md:hidden'>
                    <p className='font-normal text-xs text-blue-1'>
                        Our dedicated team is here 24/7 to provide you with the support and attention you deserve. Whether it's a late-night question or an early-morning concern, we're always ready to ensure you receive the best care, whenever you need it.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default QualityExperts