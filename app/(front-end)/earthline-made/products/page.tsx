'use client';

import Lenis from 'lenis';
import Box from "@mui/material/Box";
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence, motion } from "framer-motion";
import InputAdornment from "@mui/material/InputAdornment";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLayoutEffect, useState, useEffect } from "react";
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import HowToOrder from '@/app/(front-end)/earthline-made/components/HowToOrder/HowToOrder';
import ProductCard from '@/app/(front-end)/earthline-made/components/productCard/ProductCard';


type ProductType = { folder: string; product: string; description: string; images: { secure_url: string; public_id: string; }[];};


export default function Page() {

	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);

	// Track Scroll Position
	const [showFloatingFilter,setShowFloatingFilter] = useState(false);
	const [showFloatingFilterScroll,setShowFloatingFilterScroll] = useState(false);

	// Scroll Effect
	useEffect(()=>{
		const handleScroll = () => setShowFloatingFilterScroll(window.scrollY > 500); 
		window.addEventListener("scroll",handleScroll);
		return () => window.removeEventListener("scroll",handleScroll);
	},[]);

	// Searching and filtering
	const [search,setSearch] = useState("");
	const [activeFolder,setActiveFolder] = useState("all");
	const folders = [ "all", ...Array.from( new Set( products.map(p => p.folder).filter(Boolean) ) ) ];

	const filteredProducts = products.filter((p) => {
		const matchesSearch = p.product.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
		const matchesFolder = activeFolder === "all" || p.folder === activeFolder
		return matchesSearch && matchesFolder
	})
	
	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];

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

	const resetStates = () => { setSearch(""); setActiveFolder("all"); setShowFloatingFilter(false); };

	return (
		<>
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={isLoading ? '' :styles.main}>
				<div className={styles.howToOrder}>
					<Avatar className={`bg-[#564F47]! text-[#EDE8E4]! cursor-pointer! ${showFloatingFilterScroll ? "" : "hidden!"}`} onClick={ () => setShowFloatingFilter(!showFloatingFilter) }>
						<FilterListIcon />
					</Avatar>
				</div>

				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 m-6 bg-[#564F47] rounded-md">
					<Typography variant="h5" className="p-2" sx={{ color: "#EDE8E4" }}> {`Products`} </Typography>
					<AnimatePresence>
						{
							showFloatingFilterScroll && showFloatingFilter && (
								<Box component={motion.div} initial={{ opacity:0, y:-40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-40 }} transition={{ duration:.25 }} className="fixed top-6 md:top-10 lg:top-14 left-1/2 -translate-x-1/2 z-40 shadow-xl rounded-xl p-4 flex flex-col gap-3 w-[95%] md:w-auto max-w-190" sx={{ backgroundColor:"#564F47", backdropFilter:"blur(12px)", border:"1px solid rgba(0,0,0,0.08)" }}>
									{/* PRIMARY FILTER CONTROLS */}
									<Box className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
										<TextField size="small" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} fullWidth sx={{ backgroundColor:"#fff", borderRadius:"6px", minWidth:{ md:220 } }} InputProps={{ startAdornment:( <InputAdornment position="start"> <SearchIcon/> </InputAdornment> ) }} />
										<TextField select size="small" value={activeFolder} onChange={(e)=>setActiveFolder(e.target.value)} fullWidth sx={{ backgroundColor:"#fff", borderRadius:"6px", minWidth:{ md:180 } }}>
											<MenuItem value="all"> {`All Products`} </MenuItem>
											{ folders.slice(1).map(folder=> <MenuItem key={folder} value={folder}> {folder} </MenuItem> ) }
										</TextField>
										<Button variant="contained" onClick={()=>{ resetStates(); }} sx={{ backgroundColor:"#EDE8E4", color:"#564F47", fontWeight:600, minWidth:"110px", "&:hover":{ backgroundColor:"#dcd5d0" } }}> {`Reset`} </Button>
									</Box>
									{/* SECONDARY ACTION */}
									<Box className="flex justify-end">
										<Button variant="contained" onClick={handleOpen} sx={{ backgroundColor:"#3f3833", color:"#EDE8E4", fontWeight:500, px:3, "&:hover":{ backgroundColor:"#2e2925" } }}> {`How To Order`} </Button>
									</Box>
								</Box>
							)
						}
					</AnimatePresence>
					<Box className="w-full lg:w-auto rounded-lg px-5 py-3 flex flex-col md:flex-row md:items-center gap-4" sx={{ backgroundColor: "#564F47" }}>
						<TextField size="small" placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)} sx={{ backgroundColor: "#EDE8E4", borderRadius: "6px", width: { xs: "100%", md: 320 } }} InputProps={{ startAdornment: ( <InputAdornment position="start"> <SearchIcon/> </InputAdornment> ) }} />
						<TextField select size="small" value={activeFolder} onChange={(e)=>setActiveFolder(e.target.value)} sx={{ backgroundColor: "#EDE8E4", borderRadius: "6px", minWidth: 200 }}>
							<MenuItem value="all">{`All Products`}</MenuItem>
							{ folders.slice(1).map(folder=> <MenuItem key={`folder-${folder}`} value={folder}> {folder} </MenuItem> )}
						</TextField>
						<Button variant="contained" onClick={()=>{ resetStates(); }}> {`Reset`} </Button>
						<Button variant="contained" onClick={handleOpen}>{`How to Order`}</Button>
					</Box>
				</div>

				<Masonry columns={{ xs: 1 }} spacing={{ xs: 1 }} className={`m-0!`}>
					{filteredProducts.length === 0 && ( <div className="text-center py-20 text-[#564F47] text-lg"> {`No products found...!`} </div> ) }
					{ filteredProducts.map((product, index) => <ProductCard key={`${product.folder}-${product.product}`} product={product} index={index} pageReady={!isLoading} /> ) }
				</Masonry>

			</div>

			<HowToOrder open={open} handleClose={handleClose} />
		</>
	);
}