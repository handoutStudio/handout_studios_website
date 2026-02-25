"use client";

import Link from "next/link";
import { useState } from "react";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import WebIcon from '@mui/icons-material/Web';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { CardHeader, Divider } from "@mui/material";


type brandPageProps = { logo: string; alt: string; para: string; caller: string; screenSize: number; };

export default function BrandPage({logo, alt, para, caller, screenSize }: brandPageProps) {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [getHandoutButton, setHandoutButton] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [getEarthlineButton, setEarthlineButton] = useState(true);

	return (
		<Card className={`w-full max-w-125 xl:max-w-150 2xl:max-w-175 shadow-xl rounded-2xl flex flex-col justify-center items-center text-center`}>
			<CardMedia component="img" image={logo} alt={alt} width={0} height={0} className={`w-full h-full max-w-110 object-cover rounded-xl p-2`} />
			<CardHeader title={caller === 'earthline-made' ? "earth-line.made" : "Handout Studios"} className={`text-center`} />
			<CardContent>
				<p className={`max-[600px]:text-2xl min-[601px]:text-xl `}>{ para }</p>
			</CardContent>
			<CardActions className={`flex justify-self-end`}>
				<Link href={caller === 'earthline-made' ? `/earthline-made` : `/`} className={`${caller === 'earthline-made' ? ``: `cursor-not-allowed!`}`}>
					<Button className={caller === 'earthline-made' ? '' : 'cursor-not-allowed!'} variant="contained" size={`${screenSize >= 571 ? 'large' : screenSize >= 400 ? 'medium' : 'small'}`} color="error" startIcon={<WebIcon />} disabled = {caller === 'earthline-made' ? !getEarthlineButton : !getHandoutButton}>
						{ caller === 'earthline-made' ? "Go to Website" : "Website Coming Soon..." }
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
}