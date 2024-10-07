'use client'

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
    const [wholePart, decimalPart] = amount.toFixed(2).split('.');

    return (
        <div className='w-full'>
            <CountUp
                duration={2.75}
                start={0}
                end={parseFloat(wholePart)}
                separator=","
                prefix="$"
                decimals={0}
            />
            <span className="text-sm align-super">
                .<CountUp
                    duration={2.75}
                    start={0}
                    end={parseInt(decimalPart)}
                    decimals={0}
                />
            </span>
        </div>
    )
}

export default AnimatedCounter;