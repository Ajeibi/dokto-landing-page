import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Title from '../title/page'
import MembershipCard from './membershipCard'

const SubscriptionPlan: React.FC = () => {
    return (
        <div className="px-6 md:px-16 bg-purple-4 py-10">
            <Title
                h1Text="SUBSCRIPTION PLAN"
                h2Text="Choose Your Plan"
                pText="Choose the subscription plan that best suits you and enjoy quality healthcare at a pocket-friendly budget."
            />
            <div className="my-8 flex flex-col md:flex-col lg:flex-row gap-5 items-center justify-between px-10">
                <div className="mb-2 md:mb-0 lg:w-1/2">
                    <MembershipCard
                        option="Option 1"
                        title="6-MONTHS MEMBERSHIP"
                        price="$149.99"
                        consultationCovered={true}
                        prescriptionCovered={true}
                        buttonText="Choose 1-Year Membership"
                    />
                </div>
                <div className="lg:w-1/2">
                    <MembershipCard
                        option="Option 2"
                        title="1-YEAR MEMBERSHIP"
                        price="$299.99"
                        consultationCovered={true}
                        prescriptionCovered={true}
                        buttonText="Choose 1-Year Membership"
                    />
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPlan