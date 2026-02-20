/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { gsap } from "gsap";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "@/app/(front-end)/earthline-made/components/CardPage/style.module.scss";

gsap.registerPlugin(ScrollTrigger);

const CardPage = () => {
	const trackRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [images, setImages] = useState<string[]>([]);

	// 🔥 Fetch images from API
	useLayoutEffect(() => {
		const fetchImages = async () => {
			const res = await fetch("/earthline-made/api/earthlineImages");
			console.log("API Response:", res);
			const data = await res.json();
			setImages(data);
			console.log("Images:", data);
		};

		fetchImages();
	}, []);

	useEffect(() => {
		if (!images.length) return;
		const track = trackRef.current;
		const container = containerRef.current;
		if (!track || !container) return;

		const cards = gsap.utils.toArray<HTMLDivElement>(`.${styles.card}`);

		const totalWidth = track.scrollWidth - window.innerWidth;

		// Horizontal scroll animation
		gsap.to(track, { x: -totalWidth, ease: "none", scrollTrigger: { trigger: container, start: "top top", end: "bottom bottom", scrub: 1.2 } });

		// Coverflow effect tied to scroll
		ScrollTrigger.create({

			trigger: container, start: "top top", end: "bottom bottom", scrub: 1.2,

			onUpdate: () => {
				const center = window.innerWidth / 2;

				cards.forEach((card: any) => {
					const rect = card.getBoundingClientRect();
					const distance = rect.left + rect.width / 2 - center;

					const base = window.innerWidth < 768 ? 450 : 900;

					const rotation = distance * -0.05;
					const scale = 1 - Math.min(Math.abs(distance) / base, 0.35);
					const blur = Math.min(Math.abs(distance) / (base / 2), 6);

					// detect center card
					if (Math.abs(distance) < 120) card.classList.add(styles.centerCard);
					else card.classList.remove(styles.centerCard);

					gsap.set(card, { rotateY: rotation, scale: scale, z: scale * 120, filter: `blur(${blur}px)` });
				});
			}
		});

	}, [images]);

	return (
		<div ref={containerRef} className={styles.container}>
			<div className={styles.stickyWrapper}>
				<div ref={trackRef} className={styles.track}>
					{ images.map((img, index) => ( <Card key={index} className={styles.card} elevation={0}> <CardMedia component="img" image={img} alt={`image_${index}`} /> </Card> )) }
				</div>
			</div>
		</div>
	);
};

export default CardPage;