'use client';

import Lenis from 'lenis';
import Link from 'next/link';
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
import ProductCard from '@/app/(front-end)/earthline-made/components/productCard/ProductCard';
import { useLayoutEffect, useState, useEffect, useRef, DragEvent, ChangeEvent } from "react";
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';



type ProductType = { folder: string; product: string; images: { url: string; public_id: string; }[];};

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
	const [products, setProducts] = useState<ProductType[]>([]);

	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];

	// Handle file selection
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [files, setFiles] = useState<File[]>([]);
	const [folderName, setFolderName] = useState("");
	const [dragActive, setDragActive] = useState(false);
	const [previews, setPreviews] = useState<string[]>([]);
	const [uploadProgress, setUploadProgress] = useState<number[]>([]);

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
		const fetchProducts = async () => {
			try {
				const res = await fetch("/admin/earthline-made/api/getAllProducts?limit=all");
				const data = await res.json();
				setProducts(data);
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


	// Submit Upload Logic
	const handleSubmitProduct = async () => {
		if (!productName || !folderName || files.length === 0) {
			alert("Folder name, product name and images required");
			return;
		}

		setLoader(true);
		setUploadProgress(Array(files.length).fill(0));

		const uploadedUrls: string[] = [];

		for (let i = 0; i < files.length; i++) {
			const formData = new FormData();
			formData.append("folderName", folderName);
			formData.append("productName", productName);
			formData.append("files", files[i]);

			await new Promise<void>((resolve, reject) => {
				const xhr = new XMLHttpRequest();

				xhr.open("POST", "/admin/earthline-made/api/upload");

				xhr.upload.onprogress = (event) => {
					if (event.lengthComputable) {
						const percent = Math.round((event.loaded / event.total) * 100);
						setUploadProgress(prev => {
							const updated = [...prev];
							updated[i] = percent;
							return updated;
						});
					}
				};

				xhr.onload = () => {
					if (xhr.status === 200) {
						const data = JSON.parse(xhr.responseText);
						uploadedUrls.push(data.images[0].secure_url);
						resolve();
					} else {
						reject();
					}
				};

				xhr.onerror = reject;
				xhr.send(formData);
			});
		}

		setProducts(prev => [ { folder: folderName.toLowerCase().replace(/\s+/g, "-"), product: productName.toLowerCase().replace(/\s+/g, "-"), images: uploadedUrls.map(url => ({ url, public_id: "" })) }, ...prev]);
		setFiles([]);
		setPreviews([]);
		setProductName("");
		setFolderName("");
		setUploadProgress([]);
		handleCloseP();
		setLoader(false);
	};


	// Helper for Name Cleansing
	const formatImageName = (url: string) => {
		const fileName = url.split('/').pop()?.split('.')[0] || '';
		return fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
	};

	// Cleanup for preview memory
	useEffect(() => {
		return () => {
			previews.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [previews]);



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

					<Masonry columns={{  xs: 2, sm: 3, lg:4, xl: 5,  xxl: 6 }} spacing={{  xs: 2, sm: 3, lg:3, xl: 2, xxl: 1 }}>
						{
							products.map((product) => (
								<ProductCard
									key={`${product.folder}-${product.product}`}
									product={product}
									isTouch={isTouch}
									caller="admin"
									onDelete={async () => {
										await fetch( "/admin/earthline-made/api/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ folderName: product.folder, productName: product.product, }), } );
										setProducts((prev) => prev.filter( (p) => !( p.folder === product.folder && p.product === product.product ) ) );
									}}
								/>
							))
						}
					</Masonry>
				</div>

			</div>

			<Modal open={open} onClose={handleClose}>
				<Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: "85%", md: "70%", lg: "50%" }, height: { xs: "90vh", sm: "85vh" }, display: "flex", flexDirection: "column", borderRadius: 3, }}>
					<CardHeader title="How To Order" subheader="Let's create something unique for your space." sx={{ textAlign: "center", flexShrink: 0, "& .MuiCardHeader-title": { fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" }, fontWeight: 600, }, "& .MuiCardHeader-subheader": { fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, }, }} />
					<Divider sx={{ flexShrink: 0 }} />

					{/* SCROLLABLE CONTENT */}
					<CardContent sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 }, px: { xs: 2, sm: 4 }, py: { xs: 3, sm: 4 }, }}>
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

					<Divider sx={{ flexShrink: 0 }} />

					<CardActions sx={{ p: 0, flexShrink: 0 }}>
						<Button variant="contained" onClick={handleClose} sx={{ backgroundColor: "#564F47", color: "#EDE8E4", width: "100%", py: { xs: 1.5, md: 2 }, fontSize: { xs: "0.9rem", md: "1rem" }, }}>
							{`Close`}
						</Button>
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

						<TextField fullWidth value={folderName} label="Folder Name" id="folder_name" onChange={(e) => setFolderName(e.target.value)} />
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
								<Masonry columns={{  xs: 1, sm: 2, md: 3, lg:4, xl: 5,  xxl: 6 }} spacing={{  xs: 1, sm: 2, md: 3, lg:3, xl: 2, xxl: 1 }}>
									{
										files.map((file, index) => {
											// const isVideo = file.type.startsWith("video");
											return (
												<motion.div key={index} initial="rest" whileHover={isTouch ? undefined : "hover"} animate={isTouch ? "hover" : "reset"} style={{ position: "relative", overflow: "hidden", borderRadius: 12, cursor: "pointer" }}>
													{/* Image */}
													<motion.img src={previews[index]} alt={previews[index]} variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }} transition={{ duration: 0.6 }} style={{ width: "100%", display: "block" }} />
													{
														uploadProgress[index] !== undefined && ( 
															<Box className="absolute bottom-0 left-0 w-full bg-black/60 p-2">
																<Box sx={{ width: `${uploadProgress[index]}%`, height: "6px", backgroundColor: "#4caf50", transition: "0.3s", }} />
																<Typography variant="caption" color="white"> {uploadProgress[index]}% </Typography>
															</Box>
														)
													}
												</motion.div>
											);
										})
									}
								</Masonry>
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