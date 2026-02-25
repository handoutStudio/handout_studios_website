'use client';

import Lenis from 'lenis';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Masonry from '@mui/lab/Masonry';
import Modal from '@mui/material/Modal';
import Timeline from '@mui/lab/Timeline';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TimelineDot from '@mui/lab/TimelineDot';
import { AnimatePresence } from "framer-motion";
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimelineContent from '@mui/lab/TimelineContent';
import InstagramIcon from '@mui/icons-material/Instagram';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import { useLayoutEffect, useState, useEffect } from "react";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ProductCard from '@/app/(front-end)/earthline-made/components/productCard/ProductCard';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';


type ProductType = { folder: string; product: string; images: { url: string; public_id: string; }[];};


export default function Page() {

	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<ProductType[]>([]);
	
	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];
	
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

	// mobile and tablet hover effect
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		const hasTouch = window.matchMedia("(hover: none)").matches;
		setIsTouch(hasTouch);
	}, []);



	return (
		<>
			<div className={isLoading ? '' :styles.main}>
				<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
				<div className={styles.titleMain}>
					<span className={styles.title}> { `Products` } </span>
					<div> <Button variant="contained" onClick={handleOpen}>{`How to Order`}</Button> </div>
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
									caller="client"
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
		</>
	);
}