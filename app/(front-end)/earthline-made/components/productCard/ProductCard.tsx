'use client';

import gsap from "gsap";
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


gsap.registerPlugin(ScrollTrigger);


type ProductType = { folder: string; product: string; description: string; images: { secure_url: string; public_id: string }[]; };

export default function ProductCard({ product, pageReady, index }: { product: ProductType; pageReady: boolean; index: number; }) {

	// read product slug from URL
	const searchParams = useSearchParams();
	const productSlug = searchParams.get("product");
	const slug = `${product.folder}-${product.product}`;

	// New modal Setup
	const [active, setActive] = useState(0)

	const [open, setOpen] = useState(false);

	const images = Array.isArray(product.images) ? product.images : [];

	useEffect(() => {
		if (!pageReady) return;
		if (productSlug === slug) setOpen(true);
	}, [productSlug, slug, pageReady]);

	// New Update
	const isReverse = index % 2 !== 0;
	const image = images[0]?.secure_url || "";
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const textAlignment = index % 2 === 0 ? "items-start" : "items-end";


	useEffect(() => {
		if (!sectionRef.current) return;
		gsap.fromTo( sectionRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } } );
	}, []);

	return (
		<>
			<Box ref={sectionRef} className="w-full flex flex-col md:flex-row items-center gap-5 mb-5" >
				{/* IMAGE */}
				<Box className={`w-full md:w-1/2 flex ${isReverse ? "md:order-2 justify-end" : "md:order-1 justify-start"}`} onClick={() => setOpen(true)}>
					<div className="w-full h-[45vh] md:h-[65vh] lg:h-[75vh] flex items-center justify-center cursor-pointer">
						<Image src={image} alt={product.product} width={1200} height={1200} className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]" />
					</div>
				</Box>
				{/* TEXT */}
				<Box className={`w-full md:w-1/2 flex flex-col gap-6 ${textAlignment} ${isReverse ? "md:order-1" : "md:order-2"}`}>
					<Typography variant="h2" className={`font-serif text-3xl md:text-5xl lg:text-6xl`}> {product.product} </Typography>
					{/* DESCRIPTION (2 LINES ONLY) */}
					<div className="max-w-2xl text-[#564F47] text-sm md:text-base leading-relaxed">
						<p className="line-clamp-2 pr-28"> {product.description} </p>
						<span onClick={() => setOpen(true)} className="cursor-pointer flex items-center gap-1 font-medium text-[#564F47]">
							{`Learn more`}
							<ArrowRightAltIcon fontSize="large" className={`text-[#564F47]`} />
						</span>
					</div>
				</Box>
			</Box>

			{/* MODAL */}
			<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition slotProps={{ backdrop: { sx: { backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.5)", }, }, }} disableScrollLock>
				<AnimatePresence>
					{
						open && (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md overflow-y-auto">
								<div className="min-h-screen flex items-center justify-center p-4">
									<motion.div initial={{ scale: .95, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: .95, opacity: 0 }} transition={{ duration: .35 }} className="bg-[#EDE8E4] w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
										{/* IMAGE SECTION */}
										<div className="flex flex-col lg:w-[60%] bg-[#f5f1ee]">
											{/* MAIN IMAGE */}
											<div className="flex items-center justify-center p-6 md:p-10">
												<AnimatePresence mode="wait">
													<motion.img key={images[active]?.secure_url} src={product.images[active]?.secure_url} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} className="w-full max-h-[55vh] object-contain" />
												</AnimatePresence>
											</div>
											{/* THUMBNAILS */}
											<div className="flex min-[700px]:items-start items-center min-[700px]:flex-col flex-row gap-3 overflow-x-auto px-6 pb-6">
												<p className="text-xs md:text-base leading-relaxed text-[#4a4540]"> {`More Images`} </p>
												<div className="flex gap-3 overflow-x-auto px-6 pb-6">
													{
														product.images.map((img, i) => (
															<button key={i} onClick={() => setActive(i)} className={`w-20 h-20 max-[700px]:w-15 max-[700px]:h-15 shrink-0 rounded-lg overflow-hidden border-2 transition ${active === i ? "border-[#564F47]" : "border-transparent hover:border-neutral-400"} `}>
																<img src={img.secure_url} className="w-full h-full object-cover" />
															</button>
														))
													}
												</div>
											</div>
										</div>
										{/* PRODUCT INFO */}
										<div className="flex flex-col justify-between lg:w-[40%] p-6 md:p-10">
											<div>
												<h2 className="text-2xl md:text-3xl font-semibold text-[#3c3732] mb-4"> {product.product} </h2>
												<p className="text-sm md:text-base leading-relaxed text-[#4a4540]"> {product.description} </p>
											</div>
											<button onClick={() => setOpen(false)} className="mt-8 bg-[#564F47] hover:bg-[#3e3832] text-[#EDE8E4] px-6 py-3 rounded-lg transition w-full"> {`Close`} </button>
										</div>
									</motion.div>
								</div>
							</motion.div>
						)
					}
				</AnimatePresence>
			</Modal>
		</>
	);
}