'use client';

import Lenis from 'lenis';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence, motion } from "framer-motion";
import InputAdornment from "@mui/material/InputAdornment";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLayoutEffect, useState, useEffect } from "react";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import HowToOrder from '@/app/(front-end)/earthline-made/components/HowToOrder/HowToOrder';
import AddEditModal from "@/app/admin/earthline-made/components/AddEditModal/AddEditModal";
import AdminProductCard from '@/app/admin/earthline-made/components/AdminProductCard/AdminProductCard';
import CreateFolderModal from "@/app/admin/earthline-made/components/CreateFolderModal/CreateFolderModal";
import DeleteConfirmation from "@/app/admin/earthline-made/components/DeleteConfirmation/DeleteConfirmation";


type ProductType = { id: string; folder: string; product: string; description: string; images: { secure_url: string; public_id: string }[]; };

export default function Page() {

	// modal for how to order
	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	// modal for add new product
	const handleOpenP = () => setOpenP(true);
	const [openP, setOpenP] = useState(false);
	const handleCloseP = () => { setProductName(""); setProductDescription(""); setFolderName(""); setFiles([]); setPreviews([]); setOpenP(false) };
	// Variables
	const [getLoader, setLoader] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);

	// Edit State
	const [editProduct, setEditProduct] = useState<ProductType | null>(null);

	// Delete Confirmation
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState<ProductType | null>(null);

	// New Folder Creations
	const [folderError, setFolderError] = useState("");
	const [newFolderName, setNewFolderName] = useState("");
	const [createFolderOpen, setCreateFolderOpen] = useState(false);
	const [folderOptions, setFolderOptions] = useState<string[]>([]);

	// Floaring Filter States
	const [showFloatingFilter,setShowFloatingFilter] = useState(false);
	const [showFloatingFilterScroll,setShowFloatingFilterScroll] = useState(false);

	// Scroll Effect
	useEffect(()=>{
		const handleScroll = () => setShowFloatingFilterScroll(window.scrollY > 450);
		window.addEventListener("scroll",handleScroll);
		return () => window.removeEventListener("scroll",handleScroll);
	},[]);


	// Admin Products
	const [search,setSearch] = useState("");
	const [activeFolder,setActiveFolder] = useState("all");
	const filteredProducts = products.filter((p) => {
		const matchesFolder = activeFolder === "all" || p.folder === activeFolder;
		const matchesSearch = p.product.toLowerCase().includes(search.toLowerCase());
		return matchesFolder && matchesSearch;
	})


	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];


	const [files, setFiles] = useState<File[]>([]);
	const [folderName, setFolderName] = useState("");
	const [previews, setPreviews] = useState<string[]>([]);
	const [productDescription, setProductDescription] = useState("");
	const [uploadProgress, setUploadProgress] = useState<number[]>([]);

	// Variables for add new product
	const [productName, setProductName] = useState("");

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

	useEffect(() => { fetchFolders(); }, []);


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

	// Edit Product Logic
	const handleSubmitProduct = async () => editProduct? await handleEditProduct() : await handleCreateProduct();

	// Submit ulpoad Logic
	const handleCreateProduct = async () => {
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

					// Make the product with the new data
					const newProduct: ProductType = {
						id: data.product.id,
						folder: data.product.folder,
						product: data.product.product,
						description: data.product.description ?? "No Description Provided...!",
						images: data.product.images.map((img: any) => ({ secure_url: img.secure_url, public_id: img.public_id, })),
					};

					// Add the new product to the list of products
					setProducts(prev => [newProduct, ...prev])

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

	// Cleanup for preview memory
	useEffect(() => {
		return () => {
			previews.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [previews]);

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


	// Edit Handler
	const handleEditClick = (product: ProductType) => {
		setEditProduct(product);
		setProductName(product.product);
		setProductDescription(product.description);
		setFolderName(product.folder);
		setFiles([]);
		setPreviews(product.images.map(i => i.secure_url));
		setOpenP(true);
	}

	// Edit API Handler
	const handleEditProduct = async () => {
		if (!editProduct) return;

		setLoader(true);

		const formData = new FormData();

		formData.append("id", editProduct.id);
		formData.append("folderName", folderName);
		formData.append("productName", productName);
		formData.append("productDescription", productDescription);

		// determine which original images still exist
		const existingImages = editProduct.images.filter(img => previews.includes(img.secure_url) );

		formData.append( "existingImages", JSON.stringify(existingImages) );

		files.forEach(file => formData.append("files", file));

		const res = await fetch( "/admin/earthline-made/api/editProduct", { method: "PATCH", body: formData } );

		const data = await res.json();

		if (!res.ok) { alert("Update failed"); setLoader(false); return; }

		const updatedProduct: ProductType = { id: data.product.id, folder: data.product.folder, product: data.product.product, description: data.product.description, images: data.product.images };

		setProducts(prev => prev.map(p => p.id === editProduct.id ? updatedProduct : p ) );

		setEditProduct(null);
		setFiles([]);
		setPreviews([]);
		setUploadProgress([]);
		setLoader(false);

		handleCloseP();
	};

	// Delete Handler
	const handleDeleteClick = (product: ProductType) => { setDeleteTarget(product); setDeleteOpen(true); };

	// Confirm Delete Function
	const confirmDelete = async () => {
		if (!deleteTarget) return;

		await fetch("/admin/earthline-made/api/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ folderName: deleteTarget.folder, productName: deleteTarget.product }), });

		setProducts(prev => prev.filter( p => !(p.folder === deleteTarget.folder && p.product === deleteTarget.product) ) );

		setDeleteOpen(false);
		setDeleteTarget(null);
	};

	// Reset Filter States
	const resetStates = () => { setSearch(""); setActiveFolder("all"); setShowFloatingFilter(false); };


	return (
		<>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={styles.mainAdmin}>
				<Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 mb-10">
					<Typography variant="h4" className="font-semibold text-[#564F47] md:text-3xl! text-lg!"> {`Product Management`} </Typography>
					<Button variant="contained" onClick={handleOpenP} startIcon={<AddIcon />} sx={{ backgroundColor: "#564F47", "&:hover": { backgroundColor: "#3e3731" } }}> {`Add Product`} </Button>
				</Box>

				<div className={styles.howToOrder}>
					<Avatar className={`bg-[#564F47]! text-[#EDE8E4]! cursor-pointer! shadow-lg ${showFloatingFilterScroll ? "" : "hidden!"}`} onClick={ () => setShowFloatingFilter(!showFloatingFilter) }>
						<FilterListIcon />
					</Avatar>
				</div>

				<AnimatePresence>
					{
						showFloatingFilter && showFloatingFilterScroll && (
							<Box component={motion.div} initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-30}} transition={{duration:.25}} className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
								<Card className="rounded-2xl shadow-xl px-4 py-3 flex flex-col md:flex-row items-center gap-3" sx={{ background:"#564F47" }}>
									<CardContent className="flex flex-col gap-3">
										<TextField size="small" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} sx={{background:"#fff",borderRadius:"8px"}} />
										<TextField select size="small" value={activeFolder} onChange={(e)=>setActiveFolder(e.target.value)} sx={{background:"#fff",borderRadius:"8px"}}>
											<MenuItem value="all">All Folders</MenuItem>
											{ folderOptions.map(folder => <MenuItem key={folder} value={folder}>{folder}</MenuItem> ) }
										</TextField>
									</CardContent>
									<CardActions className={`md:flex md:gap-2 md:flex-col md:items-center`}>
										<Button variant="contained" onClick={handleOpenP} sx={{ background:"#EDE8E4 !important", color:"#564F47 !important", "&:hover":{background:"#ddd6d0 !important"} }}> {`Add Product`} </Button>
										<Button variant="contained" onClick={resetStates} sx={{ background:"#EDE8E4 !important", color:"#564F47 !important", "&:hover":{background:"#ddd6d0 !important"} }}> {`Reset`} </Button>
									</CardActions>
								</Card>
							</Box>
						)
					}
				</AnimatePresence>

				{/* Updated Stats */}
				<Grid container spacing={3} className="mb-8 px-6">

					<Grid size={{ xs:12, md:4 }}>
						<Card className="rounded-2xl shadow-md bg-[#564F4712]!">
							<CardContent className="flex items-center justify-between">
								<Box>
									<Typography className="text-[#564F47]! text-sm"> {`Total Products`} </Typography>
									<Typography variant="h4" className="text-[#564F47]! font-bold"> {products.length} </Typography>
								</Box>
								<Inventory2Icon className="text-[#564F47]! opacity-60" fontSize="large"/>
							</CardContent>
						</Card>
					</Grid>

					<Grid size={{ xs:12, md:4 }}>
						<Card className="rounded-2xl shadow-md bg-[#564F4712]!">
							<CardContent className="flex items-center justify-between">
								<Box>
									<Typography className="text-[#564F47]! text-sm"> {`Total Images`} </Typography>
									<Typography variant="h4" className="text-[#564F47]! font-bold"> {products.reduce((a,p)=>a+p.images.length,0)} </Typography>
								</Box>
								<PhotoLibraryIcon className="text-[#564F47]! opacity-60" fontSize="large"/>
							</CardContent>
						</Card>
					</Grid>

					<Grid size={{ xs:12, md:4 }}>
						<Card className="rounded-2xl shadow-md bg-[#564F4712]! backdrop-blur-sm">
							<CardContent className="flex flex-col gap-3">
								<TextField size="small" placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)} fullWidth InputProps={{ startAdornment:( <InputAdornment position="start"> <SearchIcon/> </InputAdornment> ) }} />
								<TextField select size="small" label="Folder" value={activeFolder} onChange={(e)=>setActiveFolder(e.target.value)}>
									<MenuItem value="all">{`All Folders`}</MenuItem>
									{ folderOptions.map(folder => <MenuItem key={folder} value={folder}>{folder}</MenuItem> ) }
								</TextField>
								<Button variant="contained" onClick={resetStates}> {`Reset Filters`} </Button>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				{filteredProducts.length === 0 && ( 
					<Box className="flex flex-col items-center justify-center py-24 text-center">
						<Inventory2Icon sx={{fontSize:60,color:"#c5beb7"}}/>
						<Typography variant="h6" className="text-[#8b8178] mt-4"> {`No products found`} </Typography>
						<Typography className="text-[#b0a69e]"> {`Try adjusting your filters or add a new product.`} </Typography>
					</Box>
				)}
				
				<Masonry columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }} spacing={{ xs: 1, sm: 2, lg: 3, xl: 4 }} className={`m-0!`}>
					{ filteredProducts.map(product=>( <AdminProductCard key={product.id} product={product} onEdit={()=>handleEditClick(product)} onDelete={()=>handleDeleteClick(product)} /> )) }
				</Masonry>
			</div>

			<HowToOrder open={open} handleClose={handleClose} />

			<AddEditModal open={openP} handleClose={handleCloseP} getLoader={getLoader} productName={productName} setProductName={setProductName} productDescription={productDescription} setProductDescription={setProductDescription} folderName={folderName} setFolderName={setFolderName} folderOptions={folderOptions} setCreateFolderOpen={setCreateFolderOpen} files={files} setFiles={setFiles} previews={previews} setPreviews={setPreviews} uploadProgress={uploadProgress} handleSubmitProduct={handleSubmitProduct} />

			<CreateFolderModal open={createFolderOpen} onClose={() => setCreateFolderOpen(false)} newFolderName={newFolderName} setNewFolderName={setNewFolderName} folderError={folderError} setFolderError={setFolderError} handleCreateFolder={handleCreateFolder} />

			<DeleteConfirmation deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} deleteTarget={deleteTarget} confirmDelete={confirmDelete} />

		</>
	);
}