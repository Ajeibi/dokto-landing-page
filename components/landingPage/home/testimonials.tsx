import React from 'react'
import Image from 'next/image'
import Title from '../title/page'

const Testimonials: React.FC = () => {
    return (
        <div className='px-6 md:px-16 bg-purple-5 py-10'>
            <Title
                h1Text="TESTIMONIALS"
                h2Text="Our Customers Love Us, Here Is What They Say"
                pText=""
            />
            <div className="mt-8 flex flex-col md:flex-row items-center md:gap-6">
                <div className="md:w-1/2">
                    <Image
                        src="/assets/Group.svg"
                        alt="Customer Testimonial Left"
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="md:w-1/2">
                    <Image
                        src="/assets/andrew_zik.svg"
                        alt="Customer Testimonial Right"
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default Testimonials