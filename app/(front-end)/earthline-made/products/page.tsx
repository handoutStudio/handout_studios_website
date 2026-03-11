'use client';

import Lenis from 'lenis';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import { AnimatePresence } from "framer-motion";
import { useLayoutEffect, useState, useEffect } from "react";
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import HowToOrder from '@/app/(front-end)/earthline-made/components/HowToOrder/HowToOrder';
import ProductCard from '@/app/(front-end)/earthline-made/components/productCard/ProductCard';


type ProductType = { folder: string; product: string; description: string; images: { secure_url: string; public_id: string; }[];};


export default function Page() {

	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	
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

	return (
		<>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={isLoading ? '' :styles.main}>
				<div className={styles.titleMain}>
					<h2 className={styles.title}> { `Our Products` } </h2>
					<div className={styles.howToOrder}>
						<Button variant="contained" onClick={handleOpen}>{`How to Order`}</Button>
					</div>
				</div>

				{/* <div className={styles.filterMain}>
					<span>Filter</span>
				</div> */}

				<Masonry columns={{ xs: 1 }} spacing={{ xs: 1 }} className={`m-0!`}>
					{
						products.map((product, index) => (
							<ProductCard
								key={`${product.folder}-${product.product}`}
								product={product}
								index={index}
								pageReady={!isLoading}
								caller="client"
								onEdit={() => { }}
								onDelete={() => { }}
							/>
						))
					}
				</Masonry>

			</div>

			<HowToOrder open={open} handleClose={handleClose} />
		</>
	);
}