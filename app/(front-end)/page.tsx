'use client';

import Link from "next/link";
import * as React from 'react';
import Image from "next/image";
import { Button } from "@mui/material";
import useScreenSize from '@/app/lib/useScreenSize';
import { SpaceDashboard } from "@mui/icons-material";
import { Loading } from '@/components/Loading/Loading';
import logo from '@/public/Assets/logo/compressed/final stamp 1.svg';

export default function Home() {

	const [getIsLoading, setIsLoading] = React.useState(true);
	const screenSize = useScreenSize();

	return (
		<div className={`flex justify-center items-center w-screen h-screen`}>
			{
				getIsLoading
				?
					<Loading setIsLoading={setIsLoading} />
				:
					(
						<div className={`flex gap-10 items-center justify-center flex-col min-h-screen p-4 min-[571px]:p-6`}>

							<Image src={logo} alt="handout studios" className={`w-full h-full max-h-[500px] max-w-[500px] object-cover`} width={0} height={0} />

							<div className={`flex min-[571px]:flex-row flex-col min-[571px]:gap-10 gap-6 items-center justify-center`}>
								<Link href={`#`}>
									<Button variant="contained" size={`${screenSize?.width && screenSize.width >= 571 ? 'large' : screenSize?.width && screenSize.width >= 400 ? 'medium' : 'small'}`} color="error" startIcon={<SpaceDashboard />} disabled>
										Website Coming Soon...!
									</Button>
								</Link>

								<Link href={`/dashboard`}>
									<Button variant="contained" size={`${screenSize?.width && screenSize.width >= 571 ? 'large' : screenSize?.width && screenSize.width >= 400 ? 'medium' : 'small'}`} color="error" startIcon={<SpaceDashboard />}>
										Go to Dashboard
									</Button>
								</Link>
							</div>

						</div>
					)
			}
		</div>
	);
}
