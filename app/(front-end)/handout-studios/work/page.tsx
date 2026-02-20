'use client';

import Lenis from 'lenis';
import { AnimatePresence } from "framer-motion";
import styles from '@/app/(front-end)/handout-studios/work/style.module.scss';
import { useEffect, useRef, useState } from "react";
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';

export default function Page() {
	
	const container = useRef<HTMLElement>(null);
	const [isLoading, setIsLoading] = useState(true);

    const words: string[] = [ "How We Work...!", "Comment Nous Travaillons...!", "Come Lavoriamo...!", "Como Trabalhamos...!", "私たちの働き方...!", "Hur Vi Arbetar...!", "Wie Wir Arbeiten...!", "Hoe Wij Werken...!" ];

	useEffect( () => {
		const lenis = new Lenis()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function raf(time: any) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
		setTimeout( () => { setIsLoading(false); document.body.style.cursor = 'default'; window.scrollTo(0,0); }, 2000)

		requestAnimationFrame(raf)
	}, []);

	return (
		<main ref={container} className={styles.main}>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='handout-studios' />} </AnimatePresence>
		</main>
	);
}