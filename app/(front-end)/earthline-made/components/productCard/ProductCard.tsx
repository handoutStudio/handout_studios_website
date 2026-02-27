'use client';

import Card from "@mui/material/Card";
import { motion } from "framer-motion";
import Masonry from "@mui/lab/Masonry";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useState, useEffect, useRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


type ProductType = { folder: string; product: string; images: { url: string; public_id: string }[]; };


export default function ProductCard({ product, isTouch, onDelete, caller }: { product: ProductType; isTouch: boolean; onDelete: () => void; caller: string; }) {

	const [open, setOpen] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const slideDuration = 3000;

	const images = product.images ?? [];
	const productName = product.product.replace(/-/g, " ");

	// Auto slide
	useEffect(() => {
		if (images.length <= 1 || isPaused) return;

		intervalRef.current = setInterval(() => {
			setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1 );
		}, slideDuration);

		return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
	}, [images.length, isPaused]);

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
										<motion.img src={img.url} alt={product.product} animate={{ scale: currentIndex === i ? 1.05 : 1 }} transition={{ duration: 1.5 }} style={{ width: "100%", height: "100%", objectFit: "cover", }} />
									</div>
								))
							)
						:
							( <div style={{ width: "100%", height: "100%", background: "#564F47", }} /> )
					}
				</div>

				{/* Progress Bar */}
				{!isPaused && images.length > 1 && ( <motion.div key={currentIndex} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: slideDuration / 1000, ease: "linear" }} style={{ position: "absolute", bottom: 0, left: 0, height: "3px", background: "#EDE8E4", }} /> )}

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
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", padding: "1rem", }}>
					<Card sx={{ width: { xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "65%", }, height: { xs: "100dvh", sm: "85vh", }, maxWidth: "1300px", borderRadius: { xs: 0, sm: 3, }, display: "flex", flexDirection: "column", overflow: "hidden", }}>
						<CardHeader title={product.folder} sx={{ position: "sticky", top: 0, zIndex: 2, backgroundColor: "#EDE8E4", borderBottom: "1px solid rgba(0,0,0,0.08)", px: { xs: 1.5, sm: 2.5 }, py: { xs: 1.2, sm: 1.5 }, "& .MuiCardHeader-title": { fontWeight: 600, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem", lg: "1.4rem", }, }, }} />
						<CardContent sx={{ display: "flex", justifyContent: "space-around", alignContent: "center", overflowY: "auto", WebkitOverflowScrolling: "touch",  flex: 1, minHeight: 0, px: { xs: 1.5, sm: 2.5, md: 3 }, py: { xs: 1.5, sm: 2 },}}>
							{/* <div className={`flex flex-col items-center justify-center h-full w-1/2`}>
								<span>
									{`A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description A Very Long Description `}
								</span>
							</div> */}
							<Masonry columns={{ xs: 1, sm: 2, md: 2, lg: 3 }} spacing={{ xs: 3, sm: 2.5, md: 2, lg: 1.5 }}>
								{ images.map((img, index) => <div key={img.public_id ?? index}> <motion.img src={img.url} alt={product.product} style={{ width: "100%", borderRadius: 16, objectFit: "cover", }} transition={{ duration: 0.4 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} /> </div> ) }
							</Masonry>
						</CardContent>
						<Divider />
						<CardActions sx={{ p: { xs: 1.5, sm: 2 }, justifyContent: "flex-end", display: "flex", backgroundColor: "#EDE8E4", }}>
							<Button variant="contained" onClick={() => setOpen(false)} sx={{ backgroundColor: "#564F47", color: "#EDE8E4", px: { sm: 3, md: 4 }, py: 1, fontSize: { xs: "0.4rem", sm: "0.6rem", md: "0.8rem" , lg: "1rem" }, }}> {`Close`} </Button>
						</CardActions>
					</Card>
				</div>
			</Modal>
		</>
	);
}