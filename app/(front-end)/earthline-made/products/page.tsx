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
import { useLayoutEffect, useState, useEffect } from "react";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import ProductCard from '@/app/admin/earthline-made/products/productCard/page';
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
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
				const res = await fetch("/admin/earthline-made/api/getAllProducts");
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
			<AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
			<div className={styles.main}>
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
		</>
	);
}