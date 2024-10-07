import React from 'react';

interface TitleProps {
    h1Text: string;
    h2Text: string;
    pText?: string;
}

const Title: React.FC<TitleProps> = ({ h1Text, h2Text, pText }) => {
    return (
        <div className="text-center mt-10 mb-7 space-y-3 max-w-[690px] mx-auto">
            <h1 className="lg:text-base md:text-sm text-xs font-sans font-normal text-purple-1">{h1Text}</h1>
            <h2 className="lg:text-2xl md:text-xl text-lg font-medium mb-2">{h2Text}</h2>
            {pText && <p className="md:text-sm text-sm text-blue-2">{pText}</p>}
        </div>
    );
};

export default Title;
