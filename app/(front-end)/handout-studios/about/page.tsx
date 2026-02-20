'use client';

import gsap from 'gsap';
import Lenis from 'lenis';
import Image from "next/image";
import styles from '@/app/(front-end)/handout-studios/about/style.module.scss';
import { useEffect, useRef, useState } from "react";
import useMousePosition from '@/app/hooks/useMousePosition';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import { useScroll, useTransform, motion, AnimatePresence, TargetAndTransition } from "framer-motion";

// Photos Import
import Pic1 from '@/public/images/background.svg';
import Pic8 from '@/public/images/earthline-made.svg';
import Pic2 from '@/public/images/owners/L-A-R-R.jpeg';
import Pic3 from '@/public/images/owners/L-R-R-A.jpeg';
import Pic4 from '@/public/images/owners/U-R-D-A.jpeg';
import Pic5 from '@/public/images/owners/L-R-R-A-1.jpeg';
import Pic6 from '@/public/images/owners/L-R-R-A-2.jpeg';
import Pic7 from '@/public/images/owners/L-A-R-R-1.jpeg';

export default function Page() {

	
	const container = useRef<HTMLElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] })

	const words: string[] = ["About Us", "À Propos de Nous", "Chi Siamo", "Sobre Nós", "私たちについて", "Om Oss", "Über Uns", "Over Ons" ];

	const pictures = [Pic1, Pic2, Pic3, Pic4, Pic5, Pic6, Pic7, Pic8 ];

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
		<main ref={container} className={`relative h-[200vh] bg-[#7a0007]`}>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='handout-studios' />} </AnimatePresence> 
			<Section1 scrollYProgress={scrollYProgress} />
			<Section2 scrollYProgress={scrollYProgress} pictures={pictures} />
		</main>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Section1 = ({scrollYProgress}: any) => {

	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

	const { x, y } = useMousePosition();
	const [isHovered, setIsHovered] = useState(false);
	const size = isHovered ? 400 : 40;
	const safeX = x ?? 0;
	const safeY = y ?? 0;

	return (
		<motion.div style={{scale, rotate}} className={`sticky top-0 h-screen bg-[#FFFFFF]`}>
			<main className={styles.main}>
				<motion.div className={styles.mask} animate={{ WebkitMaskPosition: `${safeX - (size/2)}px ${safeY - (size/2)}px`, WebkitMaskSize: `${size}px` } as unknown as TargetAndTransition } transition={{ type: "tween", ease: "backOut", duration:0.5}}>
					<p onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
						{`A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is equally good.`}
					</p>
				</motion.div>
				<div className={styles.body}>
					<p>{`I'm a `}<span>{`selectively skilled`}</span> {`product designer with strong focus on producing high quality & impactful digital experience.`}</p>
				</div>
			</main>
		</motion.div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Section2 = ({scrollYProgress, pictures}: any) => {

	const rootRef = useRef<HTMLDivElement>(null);
	const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let InertiaPlugin: any;
		const loadAndAnimate = async () => {
			const plugin = await import('gsap/InertiaPlugin');
			InertiaPlugin = plugin.InertiaPlugin;
			gsap.registerPlugin(InertiaPlugin);

			let oldX = 0, oldY = 0, deltaX = 0, deltaY = 0;
			const root = rootRef.current;

			if (!root) return;

			root.addEventListener('mousemove', (e) => {
				deltaX = e.clientX - oldX;
				deltaY = e.clientY - oldY;
				oldX = e.clientX;
				oldY = e.clientY;
			});

			root.querySelectorAll<HTMLDivElement>('.media')?.forEach((el) => {
				el.addEventListener('mouseenter', () => {
					const tl = gsap.timeline({ onComplete: () => { tl.kill() } });
					tl.timeScale(1.2);

					const image = el.querySelector('img');
					if (!image) return;

					tl.to(image, { inertia: { x: { velocity: deltaX * 30, end: 0 }, y: { velocity: deltaY * 30, end: 0 }, } });

					tl.fromTo( image, { rotate: 0 }, { duration: 0.4, rotate: (Math.random() - 0.5) * 30, yoyo: true, repeat: 1, ease: 'power1.inOut', }, '<' );
				});
			});
		};
		loadAndAnimate();
	}, []);

	return <motion.div style={{scale, rotate}} className={`relative h-screen`}>
			<section className={styles.mwg_effect000} ref={rootRef}>
				<div className={styles.outTeam}>{`Our Team`}</div>
				<div className={styles.medias}>
					{
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						pictures.map((picture: any, i: number) =>
							<div className="media" key={i}>
								<Image className={`${i === 0 || i === 7 ? 'bg-transperent object-contain' : 'bg-[#7a0007] object-cover'}`} src={picture} alt={`Media ${i + 1}`} width={500} height={500} priority />
							</div>
						)
					}
				</div>
			</section>
		</motion.div>
}