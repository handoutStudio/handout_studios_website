'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from 'react';
// import { projects } from '@/app/earthline-made/data';
import { AnimatePresence } from 'framer-motion';
import styles from '@/app/(front-end)/earthline-made/style.module.scss';


// Page imports
import ContactPage from '@/app/components/Contact/ContactPage';
import LandingPage from '@/app/components/Landing/LandingPage';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import DescriptionPage from '@/app/components/Description/DescriptionPage';
import CardPage from '@/app/(front-end)/earthline-made/components/CardPage/CardPage';

export default function Home() {

	const caller='earthline-made';
	const [isLoading, setIsLoading] = useState(true);

	const words: string[] = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

	useEffect( () => {(
		async () => {
			const LocomotiveScroll = (await import('locomotive-scroll')).default
			new LocomotiveScroll();
			setTimeout( () => { setIsLoading(false); document.body.style.cursor = 'default'; window.scrollTo(0,0); }, 2000)
		}
	)()}, [])

	useEffect( () => {
		const lenis = new Lenis()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function raf(time: any) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)
	})

	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			setTimeout(() => {
				const el = document.querySelector(hash);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth' });
				}
			}, 3000); // wait until animation completes
		}
	}, []);

	return (
		<main id={`main_of_all`} className={styles.main}>

			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller={caller} />} </AnimatePresence>

			<LandingPage />

			<DescriptionPage caller={caller} />

			<CardPage />

			<ContactPage caller={caller} />

		</main>
	)
}