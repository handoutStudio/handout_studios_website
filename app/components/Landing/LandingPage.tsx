'use client'


import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/app/components/Landing/style.module.scss';
import earthlineMadeLangingImage from '@/public/images/earthline_made_landing_image.jpg';


export default function LandingPage() {

	return (
		<motion.main initial="initial" animate="enter" className={styles.landing}>
			<Image src={earthlineMadeLangingImage} fill priority alt="background" className={styles.bgImage} />
			<article>
				{`Sustainable art for timeless space.`}
			</article>
		</motion.main>
	)
}
