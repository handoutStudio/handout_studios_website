import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '@/app/components/Header/animation';
import styles from '@/app/components/Header/nav/Link/style.module.scss';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LinkPage({data, isActive, setSelectedIndicator, scrollY, caller}: any) {

	const { title, href, index} = data;

	return (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		<motion.div  className={scrollY > 1150 && scrollY < 5900 || scrollY > 7050  ? caller === 'earthline-made' ? styles.linkDarkE : styles.linkDark : caller === 'earthline-made' ? styles.linkE : styles.link}  onMouseEnter={() => {setSelectedIndicator(href)}}  custom={index}  variants={slide as any}  initial="initial"  animate="enter"  exit="exit">
			<motion.div  variants={scale}  animate={isActive ? "open" : "closed"}  className={styles.indicator}> </motion.div>
			<Link href={href}>{title}</Link>
		</motion.div>
	)
}