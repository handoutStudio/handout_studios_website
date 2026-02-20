'use client';

import gsap from 'gsap';
import Flip from 'gsap/Flip';
import Image from 'next/image';
import CustomEase from 'gsap/CustomEase';
import Lenis from '@studio-freight/lenis';
import { TextPlugin } from 'gsap/TextPlugin';
import CustomWiggle from 'gsap/CustomWiggle';
import { AnimatePresence } from 'framer-motion';
import styles from '@/app/(front-end)/handout-studios/products/style.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';


export default function Page() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState<string[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [pendingAddId, setPendingAddId] = useState<number | null>(null);
	const [removedProductId, setRemovedProductId] = useState<string[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [pendingRemoveId, setPendingRemoveId] = useState<number | null>(null);
	
	const countRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const cartButtonRef = useRef<HTMLButtonElement>(null);
	const cartRefs = useRef<{[key: string]: HTMLElement | null}>({});
	const productRefs = useRef<{[key: string]: HTMLElement | null}>({});
	const reducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const words: string[] = ["Products", "Produits", "Prodotti", "Produtos", "製品", "Produkter", "Produkte", "Producten"];

	useEffect(() => {
		async function fetchImages() {
			const res = await fetch('/handout-studios/api/products');
			const data = await res.json();
			setProducts(data.data);
		}
		fetchImages();
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {

			gsap.registerPlugin(Flip, CustomEase, CustomWiggle, TextPlugin);

			if (!CustomEase.get("cartButtonWiggle")) CustomWiggle.create("cartButtonWiggle", { wiggles: 8, type: "easeOut" });

			const lenis = new Lenis();
			function raf(time: DOMHighResTimeStamp) { lenis.raf(time); requestAnimationFrame(raf); }

			requestAnimationFrame(raf);

			setTimeout(() => { setIsLoading(false); document.body.style.cursor = 'default'; window.scrollTo(0, 0); }, 2000);
		}
	}, []);

	useEffect(() => {
		if (!titleRef.current) return;

		let wordIndex = 0;

		const animateWord = () => {
			const word = words[wordIndex];
			// const nextWord = words[(wordIndex + 1) % words.length];

			// Typing the word
			gsap.to(titleRef.current, { duration: 1.5, text: `Our ${word}|`, ease: "none", onComplete: () => { setTimeout(() => { gsap.to(titleRef.current, { duration: 2, text: "Our ", ease: "power1.in", onComplete: () => { wordIndex = (wordIndex + 1) % words.length; animateWord(); } }); }, 1200); } });
		};

		animateWord(); // start

	}, [words]);

	useEffect(() => {
		const el = wrapperRef.current;
		if (!el) return;

		const handleWheel = (e: WheelEvent) => {
			const { scrollTop, scrollHeight, clientHeight } = el;
			const atTop = e.deltaY < 0 && scrollTop <= 0;
			const atBottom = e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1;

			if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) e.preventDefault();

			else e.stopPropagation();

		};

		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => el.removeEventListener("wheel", handleWheel);
	}, []);

	const handleAdd = (id: number, product: string) => {

		const el = productRefs.current[product];
		if (!el) return;
		
		// Clone the element for animation
		const rect = el.getBoundingClientRect();
		const cartRect = cartButtonRef.current?.getBoundingClientRect();
		
		
		if (!cartRect) return;
		
		// Style clone to match original
		const clone = el.cloneNode(true) as HTMLElement;
		clone.style.position = 'fixed';
		clone.style.left = `${rect.left}px`;
		clone.style.top = `${rect.top}px`;
		clone.style.width = `${rect.width + 50}px`;
		clone.style.height = `${rect.height + 50}px`;
		clone.style.zIndex = '1';
		clone.style.margin = '0';
		clone.style.pointerEvents = 'none';
		clone.style.backgroundColor = 'transparent !important';
		clone.style.textShadow = 'none !important';

		document.body.appendChild(clone);

		// Calculate target position (cart center)
		const targetX = cartRect.left + cartRect.width / 2 - rect.left - rect.width / 2;
		const targetY = cartRect.top + cartRect.height / 2 - rect.top - rect.height / 2;

		// Animate clone flying into the cart
		gsap.to(clone, { x: targetX, y: targetY, scale: 1, opacity: 0.5, duration: 0.8, ease: "bounce.out", onComplete: () => { clone.remove(); } });

		// Replace original with outline
		el.style.background = "transparent";
		el.style.color = "transparent";
		el.style.border = "1px dashed #7a0007";
		el.style.pointerEvents = "none";

		const state = Flip.getState( [productRefs.current[product], ...Object.values(cartRefs.current)].filter(Boolean) as HTMLElement[] );
		setPendingAddId(id);


		setCartItems((prev) => [...prev, product]);
		setRemovedProductId((prev) => [...prev, product]);

		requestAnimationFrame(() => { Flip.from(state, { duration: reducedMotion ? 0 : 0.5, ease: 'back.in(0.8)', onEnter: () => { const cartEl = cartRefs.current[id]; if (cartEl) gsap.fromTo(cartEl, { y: -12 }, { y: 0, duration: 1, ease: "elastic.out(1, 0.3)" }); }, }); });

		if (!reducedMotion) {
			gsap.timeline()
				.fromTo(cartButtonRef.current, { yPercent: 0, rotation: 0 }, { yPercent: 20, rotation: -5, duration: 0.9, ease: "cartButtonWiggle", clearProps: "all" })
				.fromTo(countRef.current, { rotation: 0 }, { rotation: 720, y: -30, duration: 1.3, ease: "power4.out" }, "<")
				.to(countRef.current, { y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)", clearProps: "all" }, "-=0.6");
		}

	};

	const handleRemove = (id: number, product: string) => {

		const cartEl = cartRefs.current[product];
		const productEl = productRefs.current[product];
		if (!cartEl || !productEl) return;

		const state = Flip.getState( [cartRefs.current[product], ...Object.values(productRefs.current)].filter(Boolean) as HTMLElement[] );

		// Animate cart item disappearing
		gsap.to(cartEl, {
			scale: 0.5,
			opacity: 0,
			duration: 0.4,
			ease: "power1.inOut",
			onComplete: () => {
				// Remove from cart after animation
				setCartItems((prev) => prev.filter((item) => item !== product));
				setRemovedProductId((prev) => prev.filter((id) => id !== product)); // Restore image

				setPendingRemoveId(id);

				// Wait for React to re-render the product before animating its reappearance
				requestAnimationFrame(() => {
					Flip.from(state, { duration: reducedMotion ? 0 : 0.5, ease: "back.in(0.8)", });

					// Bounce in the restored image (with small delay to let DOM settle)
					setTimeout(() => {
						const newProductEl = productRefs.current[product];
						if (newProductEl) gsap.fromTo( newProductEl, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" } );
					}, 1000); // Slight delay to ensure DOM is ready
				});
			}
		});
	};

	function removeFromFirstHash(text?: string): string {
		if (!text) return '';
		const index = text.indexOf("#");
		return index === -1 ? text : text.slice(0, index).trim();
	}

	return (
		<>
			<main className={`${styles.main} min-h-screen`}>
				<AnimatePresence mode="wait"> { isLoading && <PreloaderPage words={words} caller='handout-studios' /> } </AnimatePresence>
				
				<div ref={titleRef} className={styles.title}> Our <span className="cursor">|</span> </div>
				
				<div className={styles.parentDiv}>
					<div className={styles.childDiv}>
						{
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							products.map((product: any, id: number) => {
								const isInCart = cartItems.includes(product.image);
								const isRemoved = removedProductId.includes(String(id));
								const showAsOutline = isInCart && !isRemoved;
								return (
									<span key={product.image} ref={(el) => { productRefs.current[product.image] = el }} onClick={(e) => { e.stopPropagation(); if (!isInCart) handleAdd(id, product.image); }} style={{ background: showAsOutline ? "transparent" : "", color: showAsOutline ? "transparent" : "", border: showAsOutline ? "2px dashed #7a0007" : "", pointerEvents: isInCart ? "none" : "auto", transition: "all 0.3s ease-in-out", }}>
										{
											!showAsOutline &&
												(
													<div className={styles.ImageDiv}>
														<Image src={`/images/products/${product.image}`} alt={`Product ${product.image}`} width={1000} height={1000} priority />
														<div className={product.caption === null ? '' : styles.overlay}>
															{removeFromFirstHash(product.caption)}
														</div>
													</div>
												)
										}
									</span>
								);
							})
						}
					</div>
				</div>
			</main>

			<aside className={`${styles.cart} ${isCartOpen ? styles.open : ''}`}>
				<div className={styles.cartButtonWrapper}>
					<button ref={cartButtonRef} onClick={() => setIsCartOpen(prev => !prev)} className={styles.cartButton}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7a0007" className="bi bi-cart" viewBox="0 0 16 16">
							<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
						</svg>
					</button>
					<div ref={countRef} className={`${styles.count} ${cartItems.length === 0 ? 'hidden!' :  'visible!'}`}> {cartItems.length} </div>
				</div>
				<div ref={wrapperRef} className={styles.itemsWrapper}>
					{
						cartItems.length === 0
						?
							<div className={styles.emptyText}>Your Cart is Empty...!</div>
						:
							<div className={styles.items}>
								{
									cartItems.map((item: string, id: number) =>
										<div key={item} ref={(el) => { cartRefs.current[item] = el }} className={styles.childDiv} title={item.split(".")[0]}>
											<p onClick={() => handleRemove(id, item)}>
												<Image src={`/images/products/${item}`} alt={`Product ${item}`} width={100} height={100} priority />
											</p>
										</div>
									)
								}
							</div>
					}
				</div>
				<button className={`${styles.orderEmail} ${cartItems.length === 0 || !isCartOpen ? 'hidden!' :  'visible!'}`}>{`Order Email`}</button>
			</aside>			
		</>
	);
}