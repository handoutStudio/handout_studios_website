'use client';

import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion } from "framer-motion";


type ProductType = { folder: string; product: string; description: string; images: { secure_url: string; public_id: string }[]; };

export default function ProductCard({ product, isTouch, onDelete, caller, pageReady, slideTick }: { product: ProductType; isTouch: boolean; onDelete: () => void; caller: string; pageReady: boolean; slideTick: number; }) {

	// read product slug from URL
	const searchParams = useSearchParams();
	const productSlug = searchParams.get("product");
	const slug = `${product.folder}-${product.product}`;

	// New modal Setup
	const [active, setActive] = useState(0)

	const [open, setOpen] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const images = Array.isArray(product.images) ? product.images : [];
	const productName = product.product;

	useEffect(() => {
		if (images.length <= 1 || isPaused) return;

		setCurrentIndex((prev) =>
			prev === images.length - 1 ? 0 : prev + 1
		);
	}, [slideTick]);

	useEffect(() => {
		if (!pageReady) return;
		if (productSlug === slug) setOpen(true);
	}, [productSlug, slug, pageReady]);

	// Reset index if image list changes
	useEffect(() => setCurrentIndex(0), [images.length]);

	return (
		<>
			<motion.div initial="rest" whileHover={!isTouch ? "hover" : undefined} animate={isTouch ? "hover" : "rest"} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} transition={{ type: "spring", stiffness: 200 }} style={{ position: "relative", overflow: "hidden", borderRadius: 16, cursor: "pointer", aspectRatio: "4 / 5", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", }} onClick={() => setOpen(true)}>
				{/* Image Container */}
				<div style={{ display: "flex", width: `${images.length * 100}%`, height: "100%", transform: `translateX(-${currentIndex * (100 / images.length)}%)`, transition: "transform 0.8s ease-in-out", }}>
					{
						images.length > 0
						?
							(
								images.map((img, i) => (
									<div key={i} style={{ flex: `0 0 ${100 / images.length}%`, height: "100%", }}>
										<motion.img src={img.secure_url} alt={product.product} animate={{ scale: currentIndex === i ? 1.05 : 1 }} transition={{ duration: 1.5 }} style={{ width: "100%", height: "100%", objectFit: "cover", }} />
									</div>
								))
							)
						:
							( <div style={{ width: "100%", height: "100%", background: "#564F47", }} /> )
					}
				</div>

				{/* Progress Bar */}
				{!isPaused && images.length > 1 && ( <motion.div key={currentIndex} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ ease: "linear" }} style={{ position: "absolute", bottom: 0, left: 0, height: "3px", background: "#EDE8E4", }} /> )}

				{/* Overlay */}
				<motion.div
					variants={{ rest: { y: "100%", opacity: 0 }, hover: { y: 0, opacity: 1 }, }} transition={{ duration: 0.4 }} style={{ position: "absolute", bottom: 0, width: "100%", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#EDE8E4", backdropFilter: "blur(8px)", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", }}>
					<span>{productName}</span>
					{
						caller === "admin" && (
							<IconButton size="small" className={`bg-transparent!`} onClick={(e) => { e.stopPropagation(); onDelete(); }} >
								<DeleteIcon sx={{ color: "#EDE8E4" }} />
							</IconButton>
						)
					}
				</motion.div>

			</motion.div>

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
													<motion.img key={product.images[active]?.secure_url} src={product.images[active]?.secure_url} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} className="w-full max-h-[55vh] object-contain" />
												</AnimatePresence>
											</div>
											{/* THUMBNAILS */}
											<div className="flex flex-col gap-3 overflow-x-auto px-6 pb-6">
												<p className="text-sm md:text-base leading-relaxed text-[#4a4540]"> {`More Images`} </p>
												<div className="flex gap-3 overflow-x-auto px-6 pb-6">
													{
														product.images.map((img, i) => (
															<button key={i} onClick={() => setActive(i)} className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition ${active === i ? "border-[#564F47]" : "border-transparent hover:border-neutral-400"} `}>
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