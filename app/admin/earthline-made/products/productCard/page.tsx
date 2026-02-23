'use client';

import Card from "@mui/material/Card";
import { motion } from "framer-motion";
import Masonry from "@mui/lab/Masonry";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useState, useEffect, useRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


type ProductType = { folder: string; product: string; images: { url: string; public_id: string }[]; };


export default function ProductCard({ product, isTouch, onDelete, }: { product: ProductType; isTouch: boolean; onDelete: () => void; }) {

	// Folder descriptions mapped by folder name
	const FOLDER_DESCRIPTIONS: Record<string, string> = {
		"vase-trio": "Premium resin-crafted living room installations designed for elegance and durability.",
		"bedroom-collection": "Luxury resin decor pieces curated for modern bedroom aesthetics.",
		"office-space": "Functional yet artistic resin solutions tailored for workspace environments.",
	};

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
	useEffect(() => {
		setCurrentIndex(0);
	}, [images.length]);

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
					<IconButton size="small" className={`bg-transparent!`} onClick={(e) => { e.stopPropagation(); onDelete(); }} >
						<DeleteIcon sx={{ color: "#EDE8E4" }} />
					</IconButton>
				</motion.div>

			</motion.div>

			{/* MODAL */}
			<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition slotProps={{ backdrop: { sx: { backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.5)", }, }, }}>
				<Card sx={{ position: { xs: "fixed", md: "absolute" }, top: { xs: 0, md: "50%" }, left: { xs: 0, md: "50%" }, transform: { xs: "none", md: "translate(-50%, -50%)" }, width: { xs: "100%", md: "85%" }, height: { xs: "100%" }, borderRadius: { xs: 0, md: 3 }, display: "flex", flexDirection: "column", overflow: "hidden", }}>
					<CardHeader title={product.folder} action={ <IconButton onClick={() => setOpen(false)}> <CloseIcon /> </IconButton> } sx={{ borderBottom: "1px solid rgba(0,0,0,0.08)", "& .MuiCardHeader-title": { fontWeight: 600, fontSize: { xs: "1.1rem", sm: "1.3rem" }, }, }} />
					<CardContent sx={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", p: { xs: 2, sm: 3, md: 4 }, }}>
						<Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
							{
								images.map((img, index) => (
									<div key={index}>
										<motion.img src={img.url} alt={product.product} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 16, }} transition={{ duration: 0.4 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} />
									</div>
								))
							}
						</Masonry>
					</CardContent>
					<Divider />
					<CardActions sx={{ p: 2, justifyContent: "flex-end", }}>
						<Button variant="contained" className="bg-[#564F47]! text-[#EDE8E4]! hover:bg-[#EDE8E4]! hover:text-[#564F47]! " onClick={() => setOpen(false)}> Close </Button>
					</CardActions>
				</Card>
			</Modal>
		</>
	);
}