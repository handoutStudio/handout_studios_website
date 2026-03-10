'use client'


import Image from 'next/image';
import { motion } from 'framer-motion';
import useScreenSize from '@/app/lib/useScreenSize';
import styles from '@/app/components/Landing/style.module.scss';
import earthlineMadeLangingImage from '@/public/images/earthline_made_landing_image.png';
import earthlineMadeLangingImageTablet from '@/public/images/earthline_made_landing_image_tablet.png';
import earthlineMadeLangingImageMobile from '@/public/images/earthline_made_landing_image_mobile.png';

export default function LandingPage() {

	// check if the screen is Mobile or Tablet or Desktop
	const screenSize = useScreenSize();

	const isMobile = screenSize?.width && screenSize.width <= 830;
	const isTablet = screenSize?.width && screenSize.width <= 1024;
	const isDesktop = screenSize?.width && screenSize.width >= 1025;

	return (
		<motion.main initial="initial" animate="enter" className={styles.landing}>
			{
				isMobile
				?
					<Image src={earthlineMadeLangingImageMobile} fill priority alt="background" className={styles.bgImage} />
				:
					isTablet
					?
						<Image src={earthlineMadeLangingImageTablet} fill priority alt="background" className={styles.bgImage} />
					:
						isDesktop
						?
							<Image src={earthlineMadeLangingImage} fill priority alt="background" className={styles.bgImage} />
						:
							null
			}
		</motion.main>
	)
}
