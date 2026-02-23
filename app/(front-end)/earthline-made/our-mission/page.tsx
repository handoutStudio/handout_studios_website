'use client';

import Lenis from 'lenis';
import Image from 'next/image';
import { Masonry } from '@mui/lab';
import Card  from '@mui/material/Card';
import { useEffect, useState } from "react";
import CardMedia from '@mui/material/CardMedia';
import { AnimatePresence } from "framer-motion";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ourMissionSVG from '@/public/images/our_mission.svg';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from '@/app/(front-end)/earthline-made/our-mission/style.module.scss';
import earthlineLogo from '@/public/images/earthline-made.svg';

export default function Page() {

	const [isLoading, setIsLoading] = useState(true);

	const words: string[] = [ "Our Mission...!", "Notre Mission...!", "La Nostra Missione...!", "Nossa Missão...!", "Nuestra Misión...!", "Unsere Mission...!", "Onze Missie...!", "Vårt Uppdrag...!", "私たちの使命...!", "مهمتنا...!", "우리의 사명...!", "我们的使命...!", "हमारा मिशन...!", "અમારું ધ્યેય...!" ];

	const cardContents = [ { title: "From Waste to Wonder", caption: "Turning discarded materials into timeless art.", body: "We transform waste such as paper bags, plastic bottles, and other recycled materials into sustainable décor and furniture. Each piece is handcrafted to give new life to what would otherwise be discarded."}, { title: "Crafted for You", caption: "Custom designs that reflect your space and story.", body: "We don't mass-produce. Every product is made to order, tailored to your needs, style, and space — ensuring it's unique and meaningful to you."}, { title: "Your Waste, Our Canvas", caption: "Give us your paper bags, we'll give you art.", body: "We invite you to collect and share your paper waste with us. We'll turn it into functional, beautiful art pieces — a creative way to recycle and contribute to sustainability" } ];

	useEffect( () => {
		const lenis = new Lenis()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function raf(time: any) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
		setTimeout( () => { setIsLoading(false); document.body.style.cursor = 'default'; window.scrollTo(0,0); }, 3000)

		requestAnimationFrame(raf)
	}, []);

	return (
		<>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={styles.main}>
				<div className={styles.title}>{ `Our Mission` }</div>
				<Masonry columns={{  xs: 1, sm: 2, md:3, lg: 4, xl: 5, xxl: 6 }} spacing={{  xs: 1, sm: 2, md:3, lg: 4, xl: 5, xxl: 6 }}>
					{
						cardContents.map((cardContent: any, i: number) => {
							return (
								<Card key={i} className={`rounded-2xl!`}>
									{/* <div>
										<Image src={earthlineLogo} width={0} height={350} alt="Our Mission SVG Image" />
									</div> */}
									<CardHeader title={cardContent.title} subheader={cardContent.caption} />
									<CardContent>
										<span className={styles.innerCardbody}>{ cardContent.body }</span>
									</CardContent>
								</Card>
							);
						})
					}
				</Masonry>
				<Image className={styles.svgImage} src={ourMissionSVG} width={0} height={0} alt="Our Mission SVG Image" />
			</div>
		</>
	);
}