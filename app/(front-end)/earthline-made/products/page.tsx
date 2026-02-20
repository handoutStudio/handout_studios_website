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
import styles from "@/app/(front-end)/earthline-made/products/style.module.scss";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';


export default function Page() {

	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	
	const [isLoading, setIsLoading] = useState(true);
	const [images, setImages] = useState<string[]>([]);
	
	const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];
	
	// 🔥 Fetch images from API
	useLayoutEffect(() => {
		const fetchImages = async () => {
			const res = await fetch("/earthline-made/api/earthlineImages");
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
					<span className={styles.title}> { `Products` } </span>
					<div> <Button variant="contained" onClick={handleOpen}>{`How to Order`}</Button> </div>
				</div>

				<div className={styles.filterMain}>
					{/* <div className={styles.filter}>
						<span>Filter</span>
					</div> */}

					<Masonry columns={{  xs: 2, sm: 3, lg:4, xl: 5,  xxl: 6 }} spacing={{  xs: 2, sm: 3, lg:3, xl: 2, xxl: 1 }}>
						{
							images.map((image: string, i: number) => {
								const imageName = formatImageName(image);
								return (
									// <motion.div key={i} initial="rest" whileHover="hover" animate="rest" style={{ position: "relative", overflow: "hidden", borderRadius: 12, cursor: "pointer" }}>
									<motion.div key={i} initial="rest" whileHover={isTouch ? undefined : "hover"} animate={isTouch ? "hover" : "reset"} style={{ position: "relative", overflow: "hidden", borderRadius: 12, cursor: "pointer" }}>
										{/* Image */}
										<motion.img src={image} alt={imageName} variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }} transition={{ duration: 0.6 }} style={{ width: "100", display: "block" }} />

										{/* Overlay */}
										<motion.div variants={{ rest: { y: "100%", opacity: 0 }, hover: { y: 0, opacity: 1 } }} transition={{ duration: 0.4 }} style={{ position: "absolute", bottom: 0, width: "100%", padding: "1rem", textAlign: "center", color: "#EDE8E4", backdropFilter: "blur(8px)", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)"}}>
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
		</>
	);
}