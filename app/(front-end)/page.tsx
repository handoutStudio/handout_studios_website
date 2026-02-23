'use client';

import Link from "next/link";
import * as React from 'react';
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import WebIcon from '@mui/icons-material/Web';
import CardMedia from "@mui/material/CardMedia";
import useScreenSize from '@/app/lib/useScreenSize';
import handoutLogo from '@/public/images/background.svg';
import earthlineLogo from '@/public/images/earthline-made.svg';
import { Loading } from '@/app/shared/components/Loading/Loading';
import { CardContent } from "@mui/material";

export default function Home() {

	const screenSize = useScreenSize();
	const [getIsLoading, setIsLoading] = React.useState(true);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [getHandoutButton, setHandoutButton] = React.useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [getEarthlineButton, setEarthlineButton] = React.useState(true);

	return (
		<div className={`flex justify-center items-center`}>
			{
				getIsLoading
				?
					<Loading setIsLoading={setIsLoading} />
				:
					(
						<div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 px-4 sm:px-8 lg:px-16 py-10 bg-linear-to-r from-[#e1c292] to-[#7a0007]">
						{/* <div className={`min-h-screen p-5 gap-10 flex items-center justify-center bg-linear-to-r from-[#e1c292] to-[#7a0007] max-[900px]:bg-linear-to-r max-[900px]:from-[#e1c292] max-[900px]:to-[#7a0007] w-full`}> */}

							{/* <Card className={`flex flex-col items-center justify-center p-2`}> */}
							<Card className="w-full max-w-125 xl:max-w-150 2xl:max-w-175 flex flex-col items-center justify-between p-4 sm:p-6 shadow-xl rounded-2xl">
									<CardMedia component="img" image={handoutLogo.src} alt="handout studios" className={`w-full h-full max-w-100 object-cover`} />
									<div className={`flex flex-col items-center justify-center gap-10 p-4 min-[700px]:p-6`}>
										<p className={`text-lg`}>{ "We are a multidisciplinary team of architects and interior design experts dedicated to crafting bespoke, visually striking resin artworks that seamlessly align with our client's aesthetic and functional goals." }</p>
										<Link href={getHandoutButton ? `/handout-studios` : `#`} className={`flex flex-col items-center justify-center gap-10 p-4 min-[700px]:p-6 cursor-not-allowed!`}>
											<Button className={`cursor-not-allowed!`} variant="contained" size={`${screenSize?.width && screenSize.width >= 571 ? 'large' : screenSize?.width && screenSize.width >= 400 ? 'medium' : 'small'}`} color="error" startIcon={<WebIcon />} disabled = {!getHandoutButton}>
												{ "Website Coming Soon" }
											</Button>
										</Link>
									</div>
							</Card>

							{/* <Card className={`flex flex-col items-center justify-center p-2`}> */}
							<Card className="w-full max-w-125 xl:max-w-150 2xl:max-w-175 flex flex-col items-center justify-between p-4 sm:p-6 shadow-xl rounded-2xl">
								<CardMedia component="img" image={earthlineLogo.src} alt="earthline made" className={`w-full h-full max-w-100 object-cover`} />
								<div className={`flex flex-col items-center justify-center gap-10 p-4 min-[700px]:p-6`}>
									<p className={`text-lg`}>{ "A sustainability-focused brand that transforms organic and recycled materials—such as discarded eco-friendly bags—into refined, contemporary works of art." }</p>
									<Link href={getEarthlineButton ? `/earthline-made` : `#`} className={`flex flex-col items-center justify-center gap-10 p-4 min-[700px]:p-6`}>
										<Button variant="contained" size={`${screenSize?.width && screenSize.width >= 571 ? 'large' : screenSize?.width && screenSize.width >= 400 ? 'medium' : 'small'}`} color="error" startIcon={<WebIcon />} disabled = {!getEarthlineButton}>
											Learn More
										</Button>
									</Link>
								</div>
							</Card>

						</div>

					)
			}
		</div>
	);
}







// 'use client';

// import Link from "next/link";
// import * as React from 'react';
// import Image from "next/image";
// import { Button } from "@mui/material";
// import useScreenSize from '@/app/lib/useScreenSize';
// import { SpaceDashboard } from "@mui/icons-material";
// import { Loading } from '@/components/Loading/Loading';
// import logo from '@/public/Assets/logo/compressed/final stamp 1.svg';

// export default function Home() {

// 	const [getIsLoading, setIsLoading] = React.useState(true);
// 	const screenSize = useScreenSize();

// 	return (
// 		<div className={`flex justify-center items-center w-screen h-screen`}>
// 			{
// 				getIsLoading
// 				?
// 					<Loading setIsLoading={setIsLoading} />
// 				:
// 					(
// 						<div className={`flex gap-10 items-center justify-center flex-col min-h-screen p-4 min-[571px]:p-6`}>

// 							<Image src={logo} alt="handout studios" className={`w-full h-full max-h-[500px] max-w-[500px] object-cover`} width={0} height={0} />

// 							<div className={`flex min-[571px]:flex-row flex-col min-[571px]:gap-10 gap-6 items-center justify-center`}>
// 								<Link href={`#`}>
// 									<Button variant="contained" size={`${screenSize?.width && screenSize.width >= 571 ? 'large' : screenSize?.width && screenSize.width >= 400 ? 'medium' : 'small'}`} color="error" startIcon={<SpaceDashboard />} disabled>
// 										Website Coming Soon...!
// 									</Button>
// 								</Link>

// 								<Link href={`/dashboard`}>
// 									<Button variant="contained" size={`${screenSize?.width && screenSize.width >= 571 ? 'large' : screenSize?.width && screenSize.width >= 400 ? 'medium' : 'small'}`} color="error" startIcon={<SpaceDashboard />}>
// 										Go to Dashboard
// 									</Button>
// 								</Link>
// 							</div>

// 						</div>
// 					)
// 			}
// 		</div>
// 	);
// }


