'use client';

import gsap from 'gsap';
import Link from 'next/link';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import earthLineMade from '@/public/images/earthline-made.svg';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import NavPage from '@/app/components/Header/nav/NavPage';
import MagneticPage from '@/app/common/Magnetic/MagneticPage';
import RoundedPage from '@/app/common/RoundedButton/RoundedButtonPage';
import handoutStudios from '@/public/Assets/logo/compressed/final stamp 1.svg';
import { ResponsiveImage } from '@/app/common/ResponsiveImage/ResponsiveImage';


interface HeaderPageProps { caller?: string }

export default function HeaderPage({caller}: HeaderPageProps) {
	const header = useRef(null);
	const button = useRef(null);
	const pathname = usePathname();
	const [isActive, setIsActive] = useState(false);

	const [scrollY, setScrollY] = useState(0);
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect( () => { if(isActive) setIsActive(false) }, [pathname])

	useLayoutEffect( () => {
			gsap.registerPlugin(ScrollTrigger)
			gsap.to(button.current, {
				scrollTrigger: {
					trigger: document.documentElement,
					start: 0,
					end: window.innerHeight,
					onLeave: () => {gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
					onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out", onComplete: () => setIsActive(false) }); }
				}
			})
	}, []);

	return (
		<>
			<div ref={header} className={`${caller === "earthline-made" ? pathname === "/earthline-made/products" || pathname === "/earthline-made/our-mission" ? `${styles.headerE} bg-[#564F47]!` : styles.headerE : caller === "handout-studios" ? styles.headerH : ""} ${scrollY > 200 && caller === "earthline-made" ? styles.scrolled : ""}`}>
				<div className={styles.logo} onClick={() => window.location.pathname !== '/earthline-made' && window.location.assign('/earthline-made')} style={{ cursor: 'pointer' }}>
				{
					caller === 'earthline-made'
					? 
						<></>
					:
						caller === 'handout-studios'
						?
							<p className={styles.copyright}> <ResponsiveImage src={handoutStudios} alt="handout studios logo" fill={false} /> </p>
						:
							<></>
				}
					<div className={styles.name}>
						<p className={styles.handOut}>{caller === 'earthline-made' ? "earth-line.made" : caller === 'handout-studios' ? "Handout" : ""}</p>
						<p className={styles.studios}>{caller === 'earthline-made' ? "" : caller === 'handout-studios' ? "Studios" : ""}</p>
						<p className={styles.aishiniRuzal}>{caller === 'earthline-made' ? "By Handout Studios" : caller === 'handout-studios' ? "By Aishni & Ruzal" : ""}</p>
					</div>

				</div>
				<div className={`${styles.nav}`}>
					<MagneticPage>
						<div className={styles.el}>
							{/* <a onClick={() => window.location.pathname !== '/' && window.location.assign('/')} style={{ cursor: 'pointer' }}>
								{`Home`}
							</a> */}
							<Link className={styles.links} href={`/${caller}`}> {`Home`} </Link>
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
					<MagneticPage>
						<div className={styles.el}>
							{/* <a onClick={() => window.location.pathname !== '/work' && window.location.assign('/work')} style={{ cursor: 'pointer' }}>
								{`Work`}
							</a> */}
							{
								caller === 'earthline-made'
								?
									<Link className={styles.links} href={`/${caller}/our-mission`}> {`Our Mission`} </Link>
								:
									<Link className={styles.links} href={`/${caller}/work`}> {`Work`} </Link>
							}
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
					<MagneticPage>
						<div className={styles.el}>
							{/* <a onClick={() => window.location.pathname !== '/products' && window.location.assign('/products')} style={{ cursor: 'pointer' }}>
								{`Products`}
							</a> */}
							<Link className={styles.links} href={`/${caller}/products`}> {`Products`} </Link>
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
					{
						caller !== 'earthline-made' && 
						<MagneticPage>
							<div className={styles.el}>
								{/* <a onClick={() => window.location.pathname !== '/about' && window.location.assign('/about')} style={{ cursor: 'pointer' }}>
									{`About`}
								</a> */}
								<Link className={styles.links} href={`/${caller}/about`}> {`About`} </Link>
								<div className={styles.indicator}></div>
							</div>
						</MagneticPage>
					}
					<MagneticPage>
						<div className={styles.el}>
							{/* <a onClick={() => { const aboutSection = document.getElementById('contact'); if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' }); }} style={{ cursor: 'pointer' }}>
								{`Contact`}
							</a> */}
							<Link className={styles.links} href={`/${caller}/#contact`} onClick={() => window.scrollTo({ behavior: 'smooth' })}> {`Contact`} </Link>
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
				</div>
			</div>
			<div ref={button} className={scrollY > 1150 && scrollY < 5900 || scrollY > 7050 ? caller === "earthline-made" ? "" : styles.headerButtonContainerD : caller === "earthline-made" ? "" : styles.headerButtonContainerHD}>
				<RoundedPage caller={caller} backgroundColor={scrollY > 1150 && scrollY < 5900 || scrollY > 7050 ? caller === "earthline-made" ? "" : "#7a0007" : caller === "earthline-made" ? "" : "#FFFFFF"} onClick={() => { setIsActive(!isActive) }} className={`${styles.button}`}>
					<div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
				</RoundedPage>
			</div>
			<AnimatePresence mode="wait"> {isActive && <NavPage scrollY={scrollY} caller={caller} />} </AnimatePresence>
		</>
	)
}
