import React from 'react';

interface TitleProps {
    h1Text: string;
    h2Text: string;
}

const Title2: React.FC<TitleProps> = ({ h1Text, h2Text }) => {
    return (
        <div className="mt-10 mb-7 space-y-3">
            <h1 className="lg:text-base md:text-sm text-xs font-sans font-normal text-purple-1">{h1Text}</h1>
            <h2 className="lg:text-2xl md:text-xl text-lg font-medium mb-2">{h2Text}</h2>
        </div>
    );
};

export default Title2;