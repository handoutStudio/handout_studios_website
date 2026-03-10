'use client';

import Lenis from 'lenis';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Masonry from '@mui/lab/Masonry';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { motion, AnimatePresence } from "framer-motion";
import useGlobalSlideshow from "@/app/lib/useGlobalSlideshow";
import CircularProgress from '@mui/material/CircularProgress';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import HowToOrder from '@/app/(front-end)/earthline-made/components/HowToOrder/HowToOrder';
import { useLayoutEffect, useState, useEffect, useRef, DragEvent, ChangeEvent } from "react";
import ProductCard from '@/app/(front-end)/earthline-made/components/productCard/ProductCard';


type ProductType = { folder: string; product: string; images: { secure_url: string; public_id: string }[]; };

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

	// New Folder Creations
	const [folderError, setFolderError] = useState("");
	const [newFolderName, setNewFolderName] = useState("");
	const [createFolderOpen, setCreateFolderOpen] = useState(false);
	const [folderOptions, setFolderOptions] = useState<string[]>([]);

	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];

	// TimeIntervals for cards
	const slideshowTick = useGlobalSlideshow(3000);

	// Handle file selection
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [files, setFiles] = useState<File[]>([]);
	const [folderName, setFolderName] = useState("");
	const [dragActive, setDragActive] = useState(false);
	const [previews, setPreviews] = useState<string[]>([]);
	const [productDescription, setProductDescription] = useState("");
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

	// API to fetch Folder Names
	const fetchFolders = async () => {
		try {
			const res = await fetch("/admin/earthline-made/api/getFolders");
			const data = await res.json();
			setFolderOptions(data.map((f: any) => f.name.toLowerCase()));
		}
		catch (err) { console.error("Failed to fetch folders:", err); }
	};

	useEffect(() => {
		fetchFolders();
	}, []);


	// Handling new Folder Name Logic
	useEffect(() => {
		if (folderName === "__new__") {
			const name = prompt("Enter new folder name");
			if (name) setFolderName(name.toLowerCase().replace(/\s+/g, "-"));
			else setFolderName("");
		}
	}, [folderName]);


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

	// Submit ulpoad Logic
	const handleSubmitProduct = async () => {
		if (!productName || !folderName || !productDescription || files.length === 0) { alert("Folder name, product name, description and images required"); return; }

		setLoader(true);

		const formData = new FormData();
		formData.append("folderName", folderName);
		formData.append("productName", productName);
		formData.append("productDescription", productDescription);

		files.forEach((file) => formData.append("files", file) );

		try {
			const xhr = new XMLHttpRequest();

			xhr.open("POST", "/admin/earthline-made/api/upload");

			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const percent = Math.round((event.loaded / event.total) * 100);
					setUploadProgress(files.map(() => percent));
				}
			};

			xhr.onload = async () => {
				if (xhr.status === 200) {
					const data = JSON.parse(xhr.responseText);

					setProducts((prev) => [
						{
							folder: data.product.folder,
							product: data.product.product,
							// images: data.product.images.map((img: any) => ({ url: img.secure_url, public_id: img.public_id, })),
							images: data.product.images.map((img: any) => ({ secure_url: img.secure_url, public_id: img.public_id, })),
						},
						...prev,
					]);

					setFiles([]);
					setPreviews([]);
					setProductName("");
					setProductDescription("");
					setFolderName("");
					setUploadProgress([]);

					await fetchFolders();
					handleCloseP();
				}
				else alert("Upload failed");

				setLoader(false);
			};

			xhr.onerror = () => { alert("Upload error"); setLoader(false); };

			xhr.send(formData);
		} 
		catch (err) {
			console.error(err);
			setLoader(false);
		}
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


	// Folder Duplication Check Logic
	const handleCreateFolder = () => {
		const cleaned = newFolderName.trim().toLowerCase().replace(/\s+/g, "-");
		if (!cleaned) { setFolderError("Folder name cannot be empty"); return; }
		if (folderOptions.includes(cleaned)) { setFolderError("Folder already exists"); return; }
		setFolderName(cleaned);
		setFolderOptions((prev) => [...prev, cleaned]);
		setCreateFolderOpen(false);
		setNewFolderName("");
		setFolderError("");
	};


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

					{ products.length === 0 && <div style={{ textAlign: "center", padding: "40px" }}> {`No products found`} </div> }

					<Masonry columns={{  xs: 2, sm: 3, lg:4, xl: 5,  xxl: 6 }} spacing={{  xs: 2, sm: 3, lg:3, xl: 2, xxl: 1 }}>
						{
							products.map((product) => (
								<ProductCard
									key={`${product.folder}-${product.product}`}
									product={product}
									isTouch={isTouch}
									pageReady={!isLoading}
									caller="admin"
									slideTick={slideshowTick}
									onDelete={async () => { await fetch("/admin/earthline-made/api/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ folderName: product.folder, productName: product.product, }), }); setProducts((prev) => prev.filter( (p) => !(p.folder === product.folder && p.product === product.product) ) ); }}
								/>
							))
						}
					</Masonry>
				</div>

			</div>

			<HowToOrder open={open} handleClose={handleClose} />

			<Modal open={openP} onClose={handleCloseP}>
				<Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl">
					<Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={getLoader}>
						<CircularProgress color="inherit" />
					</Backdrop>
					
					<CardHeader title="Add New Product" className="text-center" />

					<CardContent className="flex flex-col gap-6">

						{/* <TextField fullWidth value={folderName} label="Folder Name" id="folder_name" onChange={(e) => setFolderName(e.target.value)} /> */}
						<TextField select fullWidth value={folderName} label="Select Folder" onChange={(e) => { const value = e.target.value; if (value === "__create__") setCreateFolderOpen(true); else setFolderName(value); }}>
							{ folderOptions.map((folder) => ( <MenuItem key={folder} value={folder}> {folder} </MenuItem> )) }
							<Divider />
							<MenuItem value="__create__"> {`+ Create New Folder`} </MenuItem>
						</TextField>
						<TextField fullWidth value={productName} label="Product Name" id="product_name" onChange={(e) => setProductName(e.target.value)} />
						<TextField fullWidth label="Product Description" multiline rows={3} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
						{/* <TextField fullWidth label="Product Price" type="number" />
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

			<Modal open={createFolderOpen} onClose={() => setCreateFolderOpen(false)}>
				<Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 flex flex-col gap-6">
					<Typography variant="h6">Create New Folder</Typography>
					<TextField fullWidth label="Folder Name" value={newFolderName} error={!!folderError} helperText={folderError} onChange={(e) => { setNewFolderName(e.target.value); setFolderError(""); }} />
					<div className="flex justify-end gap-4">
						<Button variant="outlined" onClick={() => { setCreateFolderOpen(false); setNewFolderName(""); setFolderError(""); }}> {`Cancel`} </Button>
						<Button variant="contained" onClick={() => handleCreateFolder()}> {`Create`} </Button>
					</div>
				</Card>
			</Modal>
		</>
	);
}