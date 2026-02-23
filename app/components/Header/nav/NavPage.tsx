import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { menuSlide } from '@/app/components/Header/animation';
import LinkPage from '@/app/components/Header/nav/Link/LinkPage';
import CurvePage from '@/app/components/Header/nav/Curve/CurvePage';
import styles from '@/app/components//Header/nav/style.module.scss';
import FooterPage from '@/app/components/Header/nav/Footer/FooterPage';


interface NavPageProps { scrollY: number, caller?: string }

export default function NavPage({scrollY, caller}: NavPageProps) {
	
	const pathname = usePathname();
	const [selectedIndicator, setSelectedIndicator] = useState(pathname);
	
	const navItems = [
		{ title: "Home", href: `/${caller}` },
		{ title: caller === 'earthline-made' ? "Our Mission" : "Work", href: caller === 'earthline-made' ? `/${caller}/our-mission` : `/${caller}/work` },
		{ title: "Products", href: `/${caller}/products` },
		{ title: caller === 'earthline-made' ? "" : "About", href: caller === 'earthline-made' ? `/${caller}/` : `/${caller}/about` },
		{ title: "Contact", href: `/${caller}/#contact` },
	]
	return (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<motion.div variants={menuSlide as any} initial="initial" animate="enter" exit="exit" className={scrollY > 1150 && scrollY < 5900 || scrollY > 7050 ? caller === 'earthline-made' ? styles.menuDarkE : styles.menuDarkH : caller === 'earthline-made' ? styles.menuE : styles.menuH}> 
			<div className={styles.body}>
				<div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
					<div className={styles.header}> <p>Navigation</p> </div>
					{
						navItems.map( (data, index) =>
							<LinkPage key={index} caller={caller} scrollY={scrollY} data={{...data, index}} isActive={selectedIndicator == data.href} setSelectedIndicator={setSelectedIndicator} /> )
					}
				</div>
				<FooterPage caller={caller} />
			</div>
			<CurvePage caller={caller} />
		</motion.div>
	)
}