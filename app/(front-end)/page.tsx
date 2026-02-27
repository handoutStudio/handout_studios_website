'use client';

import { useState } from 'react';
import useScreenSize from '@/app/lib/useScreenSize';
import handoutLogo from '@/public/images/background.svg';
import BrandPage from '@/app/common/BrandCard/BrandPage';
import { Loading } from '@/app/shared/components/Loading/Loading';
import earthlineLogo from '@/public/images/earthline_made_landing_image_mobile.png';

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
						<div className="h-screen w-screen bg-[#EDE8E4] flex items-center justify-center overflow-hidden relative">
							<div className="absolute z-20 scale-100"> <BrandPage /> </div>
						</div>
					)
			}
		</div>
	);
}