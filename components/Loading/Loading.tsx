'use client';

import * as React from 'react';
import Image from "next/image";
import logo from '@/public/Assets/logo/compressed/final stamp 1.svg';

export function Loading({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<div className={`flex justify-center items-center w-screen h-screen`}>
			<div className={`animate-bounce`} role="status">
				<Image src={logo} alt="handout studios" className={`w-[200px] h-[200px] max-h-[500px] max-w-[500px] object-cover`} width={0} height={0} />
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}
