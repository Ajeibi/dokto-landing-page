import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface MembershipCardProps {
    option: string;
    title: string;
    price: string;
    consultationCovered: boolean;
    prescriptionCovered: boolean;
    buttonText: string;
}

const MembershipCard: FC<MembershipCardProps> = ({
    option,
    title,
    price,
    consultationCovered,
    prescriptionCovered,
    buttonText,
}) => {
    return (
        <div className="relative bg-white md:p-6 p-3 rounded-lg shadow-md md:w-[550px] w-[330px] h-[400px] md:h-[470px]">
            <div className="absolute top-0 right-0">
                <Image
                    src="/assets/Ellipse76.svg"
                    alt="Top Right Line Decoration"
                    width={100}
                    height={100}
                    className=''
                />
            </div>
            <div className="absolute top-0 right-0">
                <Image
                    src="/assets/Ellipse75.svg"
                    alt="Top Right Line Decoration"
                    width={115}
                    height={115}
                    className=''
                />
            </div>

            <div className="flex flex-col">
                <span className="max-w-[90px] mb-3 md:mb-5 bg-purple-3 text-gray-600 rounded-lg px-3 py-1 text-sm">
                    {option}
                </span>

                <h2 className="md:text-xl text-base font-medium mb-5 md:mb-10">{title}</h2>

                <p className="text-2xl font-bold text-purple-1 mb-10">{price}</p>

                <div className="flex justify-between items-center mb-3 md:mb-5 text-base font-medium">
                    <p className=''>Consultation Fee</p>
                    <p className={`${consultationCovered ? 'text-green-500' : 'text-red-500'}`}>
                        {consultationCovered ? 'Covered' : 'Not Covered'}
                    </p>
                </div>

                <div className="flex justify-between items-center mb-10 text-base font-medium">
                    <p>Prescription Fee</p>
                    <p className={`font-semibold ${prescriptionCovered ? 'text-green-500' : 'text-red-500'}`}>
                        {prescriptionCovered ? 'Covered' : 'Not Covered'}
                    </p>
                </div>

                <div className='flex gap-3 justify-center text-center text-purple-1 mb-5 cursor-pointer font-sans'>
                    View Benefits
                    <ChevronDown />
                </div>

                <Link href="/auth/login/subscription">
                    <Button variant="ocx1" className="w-full">
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default MembershipCard;