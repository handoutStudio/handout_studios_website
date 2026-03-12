'use client';

import gsap from 'gsap';
import Link from 'next/link';
import styles from './style.module.scss';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavPage from '@/app/components/Header/nav/NavPage';
import MagneticPage from '@/app/common/Magnetic/MagneticPage';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';



export default function HeaderPage() {

	const header = useRef(null);
	const button = useRef(null);
	const [scrollY, setScrollY] = useState(0);
	
	// Session Data Manipulation
	const { data: session, status } = useSession();
	const fullName = session?.user?.name?.split(" ")[0] + '...!';
	
	const [isActive, setIsActive] = useState(false);
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
			<div ref={header} className={`${styles.headerE} ${scrollY > 200 ? styles.scrolled : ""}`}>
				<div className={styles.logo} onClick={() => window.location.pathname !== '/admin' && window.location.assign('/admin')} style={{ cursor: 'pointer' }}>
					<div className={styles.name}>
						<p className={styles.handOut}>{"Welcome"}</p>
						<p className={styles.studios}> { status === "loading" ? "..." : fullName ?? "Admin" } </p>
					</div>

				</div>
				<div className={`${styles.nav}`}>
					<MagneticPage>
						<div className={styles.el}>
							<Link className={styles.links} href={`/admin`}> {`Home`} </Link>
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
					<MagneticPage>
						<div className={styles.el}>
							<Link className={styles.links} href={`/admin/earthline-made/products`}> {`Products`} </Link>
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
					<MagneticPage>
						<div className={styles.el}>
							<Link className={styles.links} href={`/admin/earthline-made/slideshow`}> {`Presentation`} </Link>
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
					<MagneticPage>
						<div className={styles.el}>
							<Link className={styles.links} href={`#`} onClick={() => signOut({ callbackUrl: "/" })}> {`Logout`} </Link>
							<div className={styles.indicator}></div>
						</div>
					</MagneticPage>
				</div>
			</div>
			<AnimatePresence mode="wait"> {isActive && <NavPage scrollY={scrollY} />} </AnimatePresence>
		</>
	)
}
