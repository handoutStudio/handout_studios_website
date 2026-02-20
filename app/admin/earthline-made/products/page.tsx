'use client';

import Lenis from 'lenis';
import Link from 'next/link';
import Image from 'next/image';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Masonry from '@mui/lab/Masonry';
import Modal from '@mui/material/Modal';
import Timeline from '@mui/lab/Timeline';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Backdrop from '@mui/material/Backdrop';
import TimelineDot from '@mui/lab/TimelineDot';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimelineContent from '@mui/lab/TimelineContent';
import { motion, AnimatePresence } from "framer-motion";
import InstagramIcon from '@mui/icons-material/Instagram';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import CircularProgress from '@mui/material/CircularProgress';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useLayoutEffect, useState, useEffect, useRef, DragEvent, ChangeEvent } from "react";
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';





export default function Page() {

	// modal for how to order
	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	// modal for add new product
	const handleOpenP = () => setOpenP(true);
	const [openP, setOpenP] = useState(false);
	const handleCloseP = () => setOpenP(false);
	// Variables
	const [getLoader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [images, setImages] = useState<string[]>([]);
	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];

	// Handle file selection
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [files, setFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [dragActive, setDragActive] = useState(false);

	// Variables for add new product
	const [productName, setProductName] = useState("");

	// Handle file selection
	const handleFiles = (selectedFiles: FileList | null) => {
		if (!selectedFiles) return;

		const fileArray = Array.from(selectedFiles);
		setFiles(fileArray);

		const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
		setPreviews(previewUrls);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragActive(false);
		handleFiles(e.dataTransfer.files);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragActive(true);
	};

	const handleDragLeave = () => setDragActive(false);

	const handleClickUpload = () => fileInputRef.current?.click();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);
	
	// 🔥 Fetch images from API
	useLayoutEffect(() => {
		const fetchImages = async () => {
			const res = await fetch("/earthline-made/api/earthlineImages");
			console.log("API Response:", res);
			const data = await res.json();
			setImages(data);
		};

		fetchImages();
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


	// Submit Upload Logic
	const handleSubmitProduct = async () => {
		setLoader(true);
		if (!productName || files.length === 0) {
			alert("Product name and image required");
			return;
		}

		for (const file of files) {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("productName", productName);

			const res = await fetch("/admin/earthline-made/api/upload", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();
			setImages(prev => [data.secure_url, ...prev]);
		}

		setFiles([]);
		setPreviews([]);
		setProductName("");
		handleCloseP();
		setLoader(false);
	};


	// Helper for Name Cleansing
	const formatImageName = (url: string) => {
		const fileName = url.split('/').pop()?.split('.')[0] || '';
		return fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
	};



	// mobile and tablet hover effect
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const hasTouch = window.matchMedia("(hover: none)").matches;
		setIsTouch(hasTouch);
	}, []);


	return (
		<>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={styles.main}>
				<div className={styles.titleMain}>
					<h1 className={styles.title}>
						{ `Shop` }
					</h1>
					<div className={`flex items-center justify-center gap-10 max-[786px]:gap-2`}>
						<Button variant="contained" onClick={handleOpen}>
							<p className={`text-lg max-[786px]:text-[12px]`}>{`How to Order`}</p>
						</Button>
						<Button variant="contained" onClick={handleOpenP}>
							<p className={`text-lg max-[786px]:text-[12px]`}>{`Add New Product`}</p>
						</Button>
					</div>
				</div>

				<div className={styles.filterMain}>
					{/* <div className={styles.filter}>
						<span>Filter</span>
					</div> */}

					<Masonry columns={{  xs: 1, sm: 2, md: 3, lg:4, xl: 5,  xxl: 6 }} spacing={{  xs: 1, sm: 2, md: 3, lg:3, xl: 2, xxl: 1 }}>
						{
							images.map((image: string, i: number) => {
								const imageName = formatImageName(image);

								return (
								// <motion.div key={i} initial="rest" whileHover="hover" animate="rest" style={{ position: "relative", overflow: "hidden", borderRadius: 12, cursor: "pointer" }}>
									<motion.div key={i} initial="rest" whileHover={isTouch ? undefined : "hover"} animate={isTouch ? "hover" : "reset"} style={{ position: "relative", overflow: "hidden", borderRadius: 12, cursor: "pointer" }}>
										{/* Image */}
										<motion.img src={image} alt={imageName} variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }} transition={{ duration: 0.6 }} style={{ width: "100%", display: "block" }} />

										{/* Overlay */}
										<motion.div variants={{ rest: { y: "100%", opacity: 0 }, hover: { y: 0, opacity: 1 } }} transition={{ duration: 0.4 }} style={{ position: "absolute", bottom: 0, width: "100%", padding: "1rem", textAlign: "center", color: "#EDE8E4", backdropFilter: "blur(8px)", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
											{imageName}
										</motion.div>
									</motion.div>
								);
							})
							}
					</Masonry>
				</div>

			</div>

			<Modal open={open} onClose={handleClose}>
				<Card className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl`}>
					<CardHeader title={`How To order`} subheader={`Let's Create something unique for your space.`} className={`text-center`} />
					<Divider />
					<CardContent className={`flex flex-col gap-10`}>
						<div>
							<Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, } }} className={`text-[#EDE8E4]! bg-[#564F47] w-full rounded-xl`}>
								<TimelineItem>
									<TimelineSeparator>
										<TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
											<ChecklistOutlinedIcon sx={{ color: "#564F47" }} />
										</TimelineDot>
										<TimelineConnector />
									</TimelineSeparator>
									<TimelineContent><strong><i>{`Choose your Product - `}</i></strong>{`We have a wide range of products to choose from`}</TimelineContent>
								</TimelineItem>
								<TimelineItem>
									<TimelineSeparator>
										<TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
											<ShareOutlinedIcon sx={{ color: "#564F47" }} />
										</TimelineDot>
										<TimelineConnector />
									</TimelineSeparator>
									<TimelineContent><strong><i>{`Share your Idea -`}</i></strong>{`Send us your Requirements or inspiration`}</TimelineContent>
								</TimelineItem>
								<TimelineItem>
									<TimelineSeparator>
										<TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
											<ThumbUpAltOutlinedIcon sx={{ color: "#564F47" }} />
										</TimelineDot>
										<TimelineConnector />
									</TimelineSeparator>
									<TimelineContent><strong><i>{`Approve the Design -`}</i></strong>{`We send you the Concept along with the Quote`}</TimelineContent>
								</TimelineItem>
								<TimelineItem>
									<TimelineSeparator>
										<TimelineDot sx={{ backgroundColor: "#EDE8E4" }}>
											<ThumbUpAltOutlinedIcon sx={{ color: "#564F47" }} />
										</TimelineDot>
									</TimelineSeparator>
									<TimelineContent><strong><i>{`Receive Your Piece -`}</i></strong>{`Your handcrafted art, made just for you`}</TimelineContent>
								</TimelineItem>
							</Timeline>
						</div>
						<Divider />
						<MenuList className={`text-[#EDE8E4] w-full bg-[#564F47] rounded-xl`}>
							<MenuItem disabled>
								<ListItemIcon>
									<ConnectWithoutContactOutlinedIcon sx={{ color: "#EDE8E4" }} />
								</ListItemIcon>
								<ListItemText primary={`Contact us for any queries`} />
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<InstagramIcon sx={{ color: "#EDE8E4" }} />
								</ListItemIcon>
								<ListItemText primary={ <Link href={`https://www.instagram.com/earthline.made/`} target="_blank" rel="noopener noreferrer"> <p><i>{`@earthline.made`}</i></p> </Link> } />
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<MailOutlineOutlinedIcon sx={{ color: "#EDE8E4" }} />
								</ListItemIcon>
								<ListItemText primary={ <Link href={`mailto:handoutstudio3@gmail.com`} target="_blank" rel="noopener noreferrer"> <p><i>{'handoutstudio3@gmail.com'}</i></p> </Link> } />
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<LocalShippingOutlinedIcon sx={{ color: "#EDE8E4" }} />
								</ListItemIcon>
								<ListItemText primary={ <p><i>{`(+91) - 823 - 800 - 4301`}</i></p> } />
							</MenuItem>
						</MenuList>
					</CardContent>
					<Divider />
					<CardActions className={`m-0! p-0!`}>
						<Button variant='contained' sx={{ backgroundColor: "#564F47", color: "#EDE8E4", width: "100%" }} onClick={handleClose}>Close</Button>
					</CardActions>
				</Card>
			</Modal>

			<Modal open={openP} onClose={handleCloseP}>
				<Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl">
					<Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={getLoader}>
						<CircularProgress color="inherit" />
					</Backdrop>
					
					<CardHeader title="Add New Product" className="text-center" />

					<CardContent className="flex flex-col gap-6">

						<TextField fullWidth value={productName} label="Product Name" id="product_name" onChange={(e) => setProductName(e.target.value)} />
						{/* <TextField fullWidth label="Product Description" multiline rows={3} />
						<TextField fullWidth label="Product Price" type="number" />
						<TextField fullWidth label="Product Quantity" type="number" /> */}

						{/* Drag & Drop Zone */}
						<Box onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={handleClickUpload} sx={{ border: dragActive ? "2px dashed #564F47" : "2px dashed #ccc", padding: 4, textAlign: "center", borderRadius: 2, cursor: "pointer", transition: "0.3s", backgroundColor: dragActive ? "#f5f5f5" : "transparent", }}>
							<Typography variant="body1"> Drag & Drop Images Here </Typography>
							<Typography variant="caption"> or click to upload </Typography>
							<input ref={fileInputRef} type="file" hidden multiple accept="image/*,video/*" onChange={handleChange} />
						</Box>

						{/* Preview Section */}
						{
							previews.length > 0 && (
								<Box className="grid grid-cols-2 gap-4">
									{
										files.map((file, index) => {
											const isVideo = file.type.startsWith("video");
											return (
												<Box key={index}>
													{
														isVideo
														?
															(<video src={previews[index]} controls className="w-full rounded-lg" />)
														:
															(<Image src={previews[index]} alt="preview" width={0} height={0} className="w-full rounded-lg" />)
													}
												</Box>
											);
										})
									}
								</Box>
							)
						}

					</CardContent>

					<CardActions className="flex justify-end gap-4">
						<Button variant="contained" sx={{ backgroundColor: "#EDE8E4", color: "#564F47" }} onClick={handleCloseP}> Close </Button>
						<Button variant="contained" sx={{ backgroundColor: "#564F47", color: "#EDE8E4" }} onClick={handleSubmitProduct}> Submit </Button>
					</CardActions>
				</Card>
			</Modal>
		</>
	);
}