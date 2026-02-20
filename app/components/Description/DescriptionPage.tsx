import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import styles from '@/app/components/Description/style.module.scss';
import { slideUp, opacity } from '@/app/components/Description/animation';

export default function DescriptionPage({caller}: {caller?: string}) {

	// handout-studios content
	const phraseH = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
	const introH = "The combination of my passion for design, code & interaction positions me in a unique place in the web design world."
	// earthline-made content
	const phraseE = "earth-line creates sustainable décor and furniture using paper- mâché and recycled materials. Each piece is handcrafted, combining natural textures with modern design.";
	const introE = "Our work reflects a commitment to eco-friendly practices, quality craftsmanship, and timeless style — offering art that is both beautiful and responsible."

	// vairables
	const description = useRef(null);
	const isInView = useInView(description)

	return (
		<div id='about' ref={description} className={caller === "earthline-made" ? styles.descriptionE : caller === "handout-studios" ? styles.descriptionH : ""}>
			<div className={styles.body}>
				<p>
					{
						(caller === "earthline-made" ? phraseE : phraseH).split(" ").map( (word, index) => 
							<span key={index} className={styles.mask}>
								<motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>
									{word}
								</motion.span>
							</span>
						)
					}
				</p>
				<motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
					{  caller === "earthline-made" ? introE : introH }
				</motion.p>
			</div>
		</div>
	)
}
