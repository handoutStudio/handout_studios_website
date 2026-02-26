'use client';

import { useState } from 'react';
import useScreenSize from '@/app/lib/useScreenSize';
import { Loading } from '@/app/shared/components/Loading/Loading';

export default function Homes() {

    const screenSize = useScreenSize();
    const [getIsLoading, setIsLoading] = useState(true);

    return (
        <div className={`flex justify-center items-center`}>
            {
                getIsLoading
                ?
                    <Loading setIsLoading={setIsLoading} />
                :
                    (
                        <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 px-4 sm:px-8 lg:px-16 py-10 bg-[#EDE8E4] text-[#564F47]">
                            {`For now this is Empty use the links on the top to navigate...!`}
                        </div>
                    )
            }
        </div>
    );
}