'use client';

import { useState } from 'react';
import useScreenSize from '@/app/lib/useScreenSize';
import handoutLogo from '@/public/images/background.svg';
import BrandPage from '@/app/common/BrandCard/BrandPage';
import { Loading } from '@/app/shared/components/Loading/Loading';
import earthlineLogo from '@/public/images/earthline_only_logo.png';

export default function Homes() {

	const screenSize = useScreenSize();
	const [getIsLoading, setIsLoading] = useState(true);

	const brandPageData = [
		{
			logo: handoutLogo.src,
			alt: "handout studios",
			para: "We are a multidisciplinary team of architects and interior design experts dedicated to crafting bespoke, visually striking resin artworks that seamlessly align with our client's aesthetic and functional goals.",
			caller: "handout-studios",
			screenSize: screenSize?.width
		},
		{
			logo: earthlineLogo.src,
			alt: "earthline made",
			para: "A sustainability-focused brand that transforms organic and recycled materials—such as discarded eco-friendly bags—into refined, contemporary works of art.",
			caller: "earthline-made",
			screenSize: screenSize?.width
		}
	]

	return (
		<div className={`flex justify-center items-center`}>
			{
				getIsLoading
				?
					<Loading setIsLoading={setIsLoading} />
				:
					(
						<div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 px-4 sm:px-8 lg:px-16 py-10 bg-linear-to-r from-[#e1c292] to-[#7a0007]">
							{ brandPageData.map((data: any, index: number) => <BrandPage key={index} logo={data.logo} alt={data.alt} para={data.para} caller={data.caller} screenSize={data.screenSize} /> ) }
						</div>
					)
			}
		</div>
	);
}