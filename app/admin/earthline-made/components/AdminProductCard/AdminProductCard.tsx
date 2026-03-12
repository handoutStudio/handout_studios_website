'use client'

import gsap from "gsap";
import { useState } from "react";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from "@mui/material/CardContent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { AnimatePresence, motion } from "framer-motion";


gsap.registerPlugin(ScrollTrigger);

type ProductType = { id: string; folder: string; product: string; description: string; images: { secure_url: string; public_id: string }[]; }

export default function AdminProductCard({ product, onEdit, onDelete }:{ product: ProductType; onEdit: ()=>void; onDelete: ()=>void; }) {

	// New modal Setup
	const [active, setActive] = useState(0)

	const [open, setOpen] = useState(false);

	const images = Array.isArray(product.images) ? product.images : [];

	return (
		<>
			<Card className="bg-[#EDE8E41F]! hover:shadow-xl! transition-all duration-300 cursor-pointer rounded-xl overflow-hidden" onClick={() => setOpen(true)}>

				<CardHeader action={
						<>
							<Tooltip title="Edit product">
								<IconButton size="medium" sx={{ color: "#564F47 !important", backgroundColor: "transparent !important", transition: "all .25s", "&:hover": { backgroundColor: "#564F47 !important", color: "#EDE8E4 !important" } }} onClick={(e) => { e.stopPropagation(); onEdit(); }}>
									<CreateIcon fontSize="medium"/>
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete product">
								<IconButton size="medium" sx={{ color: "#7a0007 !important", backgroundColor: "transparent !important", transition: "all .25s", "&:hover": { backgroundColor: "#7a0007 !important", color: "#EDE8E4 !important" } }} onClick={(e) => { e.stopPropagation(); onDelete(); }}>
									<DeleteIcon fontSize="medium"/>
								</IconButton>
							</Tooltip>
						</>
					}
					title={product.product} titleTypographyProps={{ variant: "h6", className: "font-semibold! text-[#564F47]!" }} />

				<CardMedia component="img" image={product.images[0]?.secure_url} alt={product.product} className="object-contain w-full h-100 " />

				<CardContent className="flex flex-col gap-5">
					<div className="max-w-2xl text-[#564F47] text-sm md:text-base leading-relaxed">
						<Typography variant="subtitle1" className="text-[#564F47]!">
							<p className="line-clamp-2 pr-28"> {product.description} </p>
						</Typography>
					</div>
					<Divider />
					<div className="flex items-center flex-row gap-3 overflow-x-auto">
						<Typography variant="caption" className="text-[#564F47]!"> {`Products Gallery`} </Typography>
						<div className="flex gap-3 overflow-x-auto">
							{
								product.images.map((img, i) => (
									<button key={i} onClick={() => setActive(i)} className={`w-15 h-15 shrink-0 rounded-md! overflow-hidden cursor-pointer! hover:scale-105`}>
										<img src={img.secure_url} className="w-full h-full object-cover" />
									</button>
								))
							}
						</div>
					</div>
				</CardContent>
			</Card>

			<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition slotProps={{ backdrop: { sx: { backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.5)", }, }, }} disableScrollLock>
				<AnimatePresence>
					{
						open && (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md overflow-y-auto">
								<div className="min-h-screen flex items-center justify-center p-4">
									{/* <motion.div initial={{ scale: .95, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: .95, opacity: 0 }} transition={{ duration: .35 }} className="bg-[#EDE8E4] w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"> */}
									<motion.div initial={{ scale: .95, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: .95, opacity: 0 }} transition={{ duration: .35 }} className="relative bg-[#EDE8E4] w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

										{/* CLOSE BUTTON */}
										<IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 12, right: 12, zIndex: 10, color: "#564F47", backgroundColor: "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)", transition: "all .2s ease", "&:hover": { backgroundColor: "#564F47", color: "#EDE8E4" } }}>
											<CloseIcon />
										</IconButton>
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
											<div className={`flex justify-end items-center`}>
												<ButtonGroup variant="text" disableElevation sx={{ backgroundColor: "#EDE8E4", borderRadius: "10px", overflow: "hidden", "& .MuiButtonGroup-grouped": { borderColor: "#564F47" } }}>
													<Button sx={{ color: "#7a0007 !important", backgroundColor: "transparent !important", fontWeight: 500, letterSpacing: ".04em", transition: "all .25s ease", "&:hover": { backgroundColor: "#7a0007 !important", color: "#EDE8E4 !important" } }} startIcon={ <DeleteIcon /> } onClick={(e) => { e.stopPropagation(); onDelete(); }}>
														{`Delete`}
													</Button>
													<Button sx={{ color: "#564F47 !important", backgroundColor: "transparent !important", fontWeight: 500, letterSpacing: ".04em", transition: "all .25s ease", "&:hover": { backgroundColor: "#564F47 !important", color: "#EDE8E4 !important" } }} endIcon={ <CreateIcon /> } onClick={(e) => { e.stopPropagation(); onEdit(); }}>
														{`Edit`}
													</Button>
												</ButtonGroup>
											</div>
										</div>
									</motion.div>
								</div>
							</motion.div>
						)
					}
				</AnimatePresence>
			</Modal>

		</>

	)
}