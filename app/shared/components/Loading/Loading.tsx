'use client';

import * as React from 'react';
import Image from "next/image";
import earthlineLogo from '@/public/images/earthline_made_landing_image_mobile.png';
import handoutLogo from '@/public/Assets/logo/compressed/final stamp 1.svg';

export function Loading({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<div className={`flex justify-evenly items-center w-screen h-screen bg-white`}>
			<div className={`animate-bounce`} role="status">
				<Image src={handoutLogo} alt="handout studios" className={`w-50 h-50 max-h-125 max-w-125 object-cover`} width={0} height={0} />
				<span className="sr-only">Loading...</span>
			</div>
			<div className={`animate-bounce`} role="status">
				<Image src={earthlineLogo} alt="earthline made" className={`w-70 h-70 max-h-125 max-w-125 object-contain rounded-full`} width={0} height={0} />
			</div>
		</div>
	);
}
