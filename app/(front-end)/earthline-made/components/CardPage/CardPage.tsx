/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { gsap } from "gsap";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import CardMedia from "@mui/material/CardMedia";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "@/app/(front-end)/earthline-made/components/CardPage/style.module.scss";

gsap.registerPlugin(ScrollTrigger);

type ProductType = { folder: string; product: string; images: { secure_url: string; public_id: string }[]; };

const CardPage = () => {

	const router = useRouter();
	const trackRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [allImages, setAllImages] = useState<string[]>([]);
	const [products, setProducts] = useState<ProductType[]>([]);

	// Helper to shuffle images
	const shuffleArray = (array: string[]) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	useLayoutEffect(() => {
			const fetchProducts = async () => {
				try {
					const res = await fetch("/admin/earthline-made/api/getAllProducts?limit=all");
					const data = await res.json();
					const productsArray = Array.isArray(data) ? data : data.products || data.data || [];
					setProducts(productsArray);
				}
				catch (error) { console.error("Failed to fetch products:", error); }
			};
	
			fetchProducts();
	}, []);

	// Flatten all product images into one array
	useEffect(() => {
		if (!products.length) return;
		const flattened = products.flatMap((p) => p.images.map((img) => img.secure_url) );
		setAllImages(shuffleArray(flattened));
	}, [products]);

	useLayoutEffect(() => {
		if (!allImages.length) return;

		const track = trackRef.current;
		const container = containerRef.current;
		if (!track || !container) return;

		let resizeTimeout: NodeJS.Timeout;

		const ctx = gsap.context(() => {

			const cards = gsap.utils.toArray<HTMLDivElement>(`.${styles.card}`);

			const getTotalWidth = () => track.scrollWidth - (window.innerWidth < 768 ? window.innerWidth * 0.9 : window.innerWidth);

			// const totalWidth = track.scrollWidth - window.innerWidth;
			let totalWidth = getTotalWidth();

			// Horizontal scroll animation
			const horizontalTween = gsap.to(track, { x: () => -getTotalWidth(), ease: "none", scrollTrigger: { trigger: container, start: "top top", end: "bottom bottom", scrub: 1.2, invalidateOnRefresh: true, }, });

			// Coverflow effect
			ScrollTrigger.create({
				trigger: container, start: "top top", end: "bottom bottom", scrub: 1.2,
				onUpdate: () => {
					const center = window.innerWidth / 2;

					cards.forEach((card: any) => {
						const rect = card.getBoundingClientRect();
						const distance = rect.left + rect.width / 2 - center;
						// with Mobile and Tablet
						const isMobile = window.innerWidth < 768;
						const isTablet = window.innerWidth < 1024;
						const base = isMobile ? 350 : isTablet ? 600 : 900;
						const rotation = isMobile ? distance * -0.025 : distance * -0.05;
						const scale = 1 - Math.min(Math.abs(distance) / base, isMobile ? 0.25 : 0.35);
						const blur = Math.min(Math.abs(distance) / (base / 2), isMobile ? 3 : 6);
						if (Math.abs(distance) < 120) card.classList.add(styles.centerCard);
						else card.classList.remove(styles.centerCard);
						gsap.set(card, { rotateY: rotation, scale: scale, z: scale * 120, filter: `blur(${blur}px)`, });
					});
				},
			});

			// 🔥 Refresh after layout stabilizes
			ScrollTrigger.refresh();

			// 🔥 Debounced resize handling
			const handleResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(() => { totalWidth = getTotalWidth(); ScrollTrigger.refresh(); }, 200); };

			window.addEventListener("resize", handleResize);

			// Cleanup resize inside context
			return () => window.removeEventListener("resize", handleResize);

		}, container);

		return () => {
			ctx.revert(); // clean GSAP properly
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};

	}, [allImages.length]);

	return (
		<div ref={containerRef} className={styles.container}>
			<div className={styles.stickyWrapper}>
				<div ref={trackRef} className={styles.track}>
					{
						allImages.map((img, index) => {
							const product = products.find(p => p.images.some(i => i.secure_url === img) );
							return <Card key={index} className={styles.card} elevation={5} onClick={() => { if (!product) return; const slug = `${product.folder}-${product.product}`; router.push(`/earthline-made/products?product=${slug}`); }} sx={{ cursor: "pointer" }}> <CardMedia component="img" image={img} alt={`image_${index}`} /> </Card>;
						})
					}
				</div>
			</div>
		</div>
	);
};

export default CardPage;
