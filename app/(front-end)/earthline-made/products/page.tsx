'use client';

import Lenis from 'lenis';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import { AnimatePresence } from "framer-motion";
import { useLayoutEffect, useState, useEffect } from "react";
import useGlobalSlideshow from '@/app/lib/useGlobalSlideshow';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import HowToOrder from '@/app/(front-end)/earthline-made/components/HowToOrder/HowToOrder';
import ProductCards from '@/app/(front-end)/earthline-made/components/ProductCards/ProductCards';


type ProductType = { folder: string; product: string; description: string; images: { secure_url: string; public_id: string; }[];};


export default function Page() {

	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	// Time Intervals for cards
	const slideshowTick = useGlobalSlideshow(3000);
	
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);
	
	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];

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

	useEffect( () => {
		const lenis = new Lenis()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function raf(time: any) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
		setTimeout( () => { setIsLoading(false); document.body.style.cursor = 'default'; window.scrollTo(0,0); }, 3000)

		requestAnimationFrame(raf)
	}, []);

	// mobile and tablet hover effect
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const hasTouch = window.matchMedia("(hover: none)").matches;
		setIsTouch(hasTouch);
	}, []);



	return (
		<>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={isLoading ? '' :styles.main}>
				<div className={styles.titleMain}>
					<span className={styles.title}> { `Products` } </span>
					<div> <Button variant="contained" onClick={handleOpen}>{`How to Order`}</Button> </div>
				</div>

				<div className={styles.filterMain}>
					{/* <div className={styles.filter}>
						<span>Filter</span>
					</div> */}

					<Masonry columns={{  xs: 2, sm: 3, lg:4, xl: 5,  xxl: 6 }} spacing={{  xs: 2, sm: 3, lg:3, xl: 2, xxl: 1 }}>
						{
							products.map((product) => (
								<ProductCards
									key={`${product.folder}-${product.product}`}
									product={product}
									isTouch={isTouch}
									pageReady={!isLoading}
									caller="client"
									slideTick={slideshowTick}
									onDelete={async () => { await fetch("/admin/earthline-made/api/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ folderName: product.folder, productName: product.product, }), }); setProducts((prev) => prev.filter( (p) => !(p.folder === product.folder && p.product === product.product) ) ); }}
								/>
							))
						}
					</Masonry>
				</div>

			</div>

			<HowToOrder open={open} handleClose={handleClose} />
		</>
	);
}