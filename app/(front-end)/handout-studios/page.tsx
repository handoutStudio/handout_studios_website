'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, useScroll } from 'framer-motion';
import { projects } from '@/app/(front-end)/handout-studios/data';
import styles from '@/app/(front-end)/handout-studios/style.module.scss';


// Page imports
import CardPage from '@/app/components/Card/CardPage';
import IntroPage from '@/app/components/Intro/IntroPage';
import ContactPage from '@/app/components/Contact/ContactPage';
// import LandingPage from '@/app/components/Landing/LandingPage';
// import ProjectsPage from '@/app/components/Projects/ProjectsPage';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import DescriptionPage from '@/app/components/Description/DescriptionPage';
import SlidingImagesPage from '@/app/components/SlidingImages/SlidingImagesPage';

export default function Home() {

	const container = useRef(null);
	const caller='handout-studios';
	const [isLoading, setIsLoading] = useState(true);
	const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })

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

			{/* <LandingPage /> */}

			<IntroPage />

			<DescriptionPage caller={caller} />

			{/* <ProjectsPage /> */}
			<div ref={container} className={`bg-[#7a0007]`}>
				{
					projects.map( (project, i) => {
						const targetScale = 1 - ( (projects.length - i) * 0.05);
						return <CardPage key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .01, 1]} targetScale={targetScale}/>
					})
				}
			</div>

			<SlidingImagesPage />
			
			<ContactPage caller={caller} />

		</main>
	)
}
