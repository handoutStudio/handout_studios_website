'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Observer from 'gsap/Observer';
import { useEffect, useRef } from 'react';
import styles from '@/app/(front-end)/handout-studios/work-test/style.module.scss';


// Pictures
import Pic1 from '@/public/images/background.svg';
import Pic8 from '@/public/images/earthline-made.svg';
import Pic2 from '@/public/images/owners/L-A-R-R.jpeg';
import Pic3 from '@/public/images/owners/L-R-R-A.jpeg';
import Pic4 from '@/public/images/owners/U-R-D-A.jpeg';
import Pic5 from '@/public/images/owners/L-R-R-A-1.jpeg';
import Pic6 from '@/public/images/owners/L-R-R-A-2.jpeg';
import Pic7 from '@/public/images/owners/L-A-R-R-1.jpeg';

gsap.registerPlugin(Observer);


export default function Page() {

	const carouselRef = useRef<HTMLDivElement>(null);
	const imagesRef = useRef<HTMLDivElement[]>([]);
	const progress = useRef({ value: 0 });
	const radius = 240;

	const pictures = [Pic1, Pic2, Pic3, Pic4, Pic8, Pic5, Pic6, Pic7 ];

	useEffect(() => {
		const el = carouselRef.current;
		const images = imagesRef.current;
		const carousel = carouselRef.current;

		let autoRotateSpeed = 0.001; // smaller = slower, negative = reverse

		const stop = () => autoRotateSpeed = 0;
		const start = () => autoRotateSpeed = 0.001;

		el?.addEventListener("mouseenter", stop);
		el?.addEventListener("mouseleave", start);

		Observer.create({
			target: carousel,
			type: 'wheel,pointer',
			onPress: () => { if (carousel) carousel.style.cursor = 'grabbing' },
			onRelease: () => { if (carousel) carousel.style.cursor = 'grab' },
			onChange: (self) => {
				gsap.killTweensOf(progress.current);
				const delta = self.event.type === 'wheel' ? self.deltaY * -0.0005 : self.deltaX * 0.05;
				gsap.to(progress.current, {
					duration: 2,
					ease: 'power4.out',
					value: progress.current.value + delta,
				});
			}
		});

		const animate = () => {
			// 🔁 Auto-rotate
			progress.current.value += autoRotateSpeed;

			images.forEach((image, index) => {
				const theta = index / images.length - progress.current.value;
				const x = -Math.sin(theta * Math.PI * 2) * radius;
				const z = Math.cos(theta * Math.PI * 2) * radius;
				image.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${360 * -theta}deg)`;
				image.style.background = `#FFFFFF`;
			});
		};

		gsap.ticker.add(animate);

		return () => {
			gsap.ticker.remove(animate);
			el?.removeEventListener("mouseenter", stop);
			el?.removeEventListener("mouseleave", start);
		};
	}, []);

	return (
		<main className="flex items-center justify-center">
			<div className={styles.carousel} ref={carouselRef}>
				{ pictures.map((picture, i) =>
					<div key={i} ref={el => { if (el) imagesRef.current[i] = el }} className={styles.carouselImage}>
						<Image src={picture} alt="img" fill />
					</div>
				) }
			</div>
		</main>
	);
}