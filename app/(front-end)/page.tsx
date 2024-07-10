import Link from "next/link";
import * as React from 'react';
import Image from "next/image";
import { Button } from "@mui/material";
import { SpaceDashboard } from "@mui/icons-material";
import logo from '@/public/Assets/logo/compressed/final stamp 1.svg';

export default function Home() {
	return (
		<div className={`flex gap-10 items-center justify-center flex-col min-h-screen`}>

			<Image src={logo} alt="handout studios" width={500} height={500} />

			<div className={`flex gap-10 items-center justify-center`}>
				<Link href={`#`}>
					<Button variant="contained" color="error" startIcon={<SpaceDashboard />} disabled>
						Website Coming Soon...!
					</Button>
				</Link>

				<Link href={`/dashboard`}>
					<Button variant="contained" color="error" startIcon={<SpaceDashboard />}>
						Go to Dashboard
					</Button>
				</Link>
			</div>

		</div>
	);
}
