"use client";


import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Masonry from '@mui/lab/Masonry';
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Accordion from '@mui/material/Accordion';
import ImageList from '@mui/material/ImageList';
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import EmailIcon from '@mui/icons-material/Email';
import ButtonGroup from "@mui/material/ButtonGroup";
import CardContent from "@mui/material/CardContent";
import ImageListItem from '@mui/material/ImageListItem';
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

import Inbox from "@/app/admin/components/Inbox/Inbox";


interface Message { id: string; name: string; email: string; phone?: string; subject?: string; message: string; brand: string; isRead: boolean; createdAt: string; isDeleted: boolean; }

type ProductType = { id: string; folder: string; product: string; description: string; images: { secure_url: string; public_id: string }[]; }

export default function Homes() {

	const router = useRouter();
	const [productCount,setProductCount] = useState(0);

	// Loading State
	const [loading, setLoading] = useState(true);
	// Product State
	const [products,setProducts] = useState<ProductType[]>([]);
	// Messages State
	const [messages, setMessages] = useState<Message[]>([]);

	// Fetch Products Stats
	async function fetchProductStats(){
		try{
			const res = await fetch("/admin/earthline-made/api/getAllProducts?limit=all");
			const data = await res.json();

			const productsArray = Array.isArray(data) ? data : data.products || [];

			setProducts(productsArray);

			setProductCount(productsArray.length);

		}
		catch(err){ console.error(err); }
	}

	// Fetch Product Stats Effect
	useEffect(()=>{ fetchProductStats(); },[]);

	// Fetch Messages
	async function fetchMessages() {
			setLoading(true);
			const res = await fetch("/api/contact-us/all");
			const data = await res.json();
			setMessages(data.data || []);
			setLoading(false);
		}

	// Fetch Messages Effect
	useEffect(() => { fetchMessages(); }, []);
	// Unread Message Count
	const unreadCount = messages.filter((m) => !m.isRead).length;

	// Animated Counter
	function AnimatedNumber({value}:{value:number}){
		const [display,setDisplay] = useState(0);
		useEffect(()=>{
			let start = 0;
			const step = value / 30;
			const interval = setInterval(()=>{ start += step; if(start >= value){ setDisplay(value); clearInterval(interval); } else setDisplay(Math.floor(start)); },20);
			return ()=>clearInterval(interval);
		},[value]);

		return <Typography variant="h4">{display}</Typography>;
	}

	// Latest Uploads
	const latestImages = products.flatMap(p => p.images.map((img:any)=>img.secure_url)).slice(0,12);

	// Recent Products
	const recentProducts = products.slice(0,5);

	// Accordians
	const [expanded, setExpanded] = useState<string | false>(false);
	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => { setExpanded(isExpanded ? panel : false); };

	return (
		<div className="bg-[#EDE8E4] text-[#564F47] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 min-h-screen">

			{/* HEADER */}
			<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 mt-2">
				<Typography variant="h4" fontWeight={700} className="text-xl sm:text-2xl lg:text-3xl"> {`Admin Dashboard`} </Typography>

				{/* QUICK ACTIONS */}
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
					<Typography variant="h6" fontWeight={600} className="text-sm sm:text-base whitespace-nowrap"> {`Quick Actions`} </Typography>
					<ButtonGroup variant="text" size="small" sx={{ backgroundColor: "#EDE8E4 !important", borderRadius: "10px", overflow: "hidden", flexWrap: "wrap", "& .MuiButtonGroup-grouped": { borderColor: "#564F47 !important", }, }}>
						<Button sx={{ color: "#564F47 !important", backgroundColor: "transparent !important", fontWeight: 500, letterSpacing: ".04em", transition: "all .25s ease", fontSize: { xs: "12px", sm: "13px", md: "14px" }, px: { xs: 1.2, sm: 2 }, "&:hover": { backgroundColor: "#564F47 !important", color: "#EDE8E4 !important", }, }} startIcon={<Inventory2Icon fontSize="small" />} onClick={() => router.push("/admin/earthline-made/products")} > {`Manage Products`} </Button>
						<Button sx={{ color: "#564F47 !important", backgroundColor: "transparent !important", fontWeight: 500, letterSpacing: ".04em", transition: "all .25s ease", fontSize: { xs: "12px", sm: "13px", md: "14px" }, px: { xs: 1.2, sm: 2 }, "&:hover": { backgroundColor: "#564F47 !important", color: "#EDE8E4 !important", }, }} startIcon={<SlideshowIcon fontSize="small" />} onClick={() => router.push("/admin/earthline-made/slideshow")}> {`Presentation`} </Button>
						<Button sx={{ color: "#564F47 !important", backgroundColor: "transparent !important", fontWeight: 500, letterSpacing: ".04em", transition: "all .25s ease", fontSize: { xs: "12px", sm: "13px", md: "14px" }, px: { xs: 1.2, sm: 2 }, "&:hover": { backgroundColor: "#564F47 !important", color: "#EDE8E4 !important", }, }} startIcon={<AddIcon fontSize="small" />} onClick={() => router.push("/admin/earthline-made/products?create=true") }> {`Add Product`} </Button>
					</ButtonGroup>
				</div>
			</div>

			{/* ===================== STATS ===================== */}
			<Masonry columns={2}>
				<Card className={`bg-[#564F4712]! text-[#564F47]!`} elevation={5}>
					<CardContent className="flex justify-between items-center">
						<Box className={`flex flex-col gap-2`}>
							<Typography variant="body2">{`Total Products`}</Typography>
							<AnimatedNumber value={productCount} />
						</Box>
						<Inventory2Icon fontSize="large" />
					</CardContent>
				</Card>

				<Card className={`bg-[#564F4712]! text-[#564F47]!`} elevation={5}>
					<CardContent className="flex justify-between items-center">
						<Box className={`flex flex-col gap-2`}>
							<Typography variant="body2">{`Unread Messages`}</Typography>
							<AnimatedNumber value={unreadCount} />
						</Box>
						<MarkEmailUnreadIcon fontSize="large" />
					</CardContent>
				</Card>
			</Masonry>

			{/* ================= INBOX ================= */}
			<Card sx={{ borderRadius: 3, mt: { xs: 3, sm: 4 }, }} className={`bg-[#564F4712]! text-[#564F47]!`} elevation={5}>
				<CardHeader title={
					<div className={`flex justify-between items-center gap-2`}>
						{`Inbox`}
						<Badge badgeContent={unreadCount} color="error">
							<EmailIcon fontSize="small" />
						</Badge>
					</div>
				} titleTypographyProps={{ fontSize: { xs: "16px", sm: "18px" } }} />
				<CardContent sx={{ p: 0 }}>
					<Inbox messages={messages} loading={loading} />
				</CardContent>
			</Card>

			{/* ================= DASHBOARD GRID ================= */}
			<Box mt={{ xs: 3, sm: 4 }}>

				{/* ACCORDION */}
				<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={`bg-[#564F4712]! text-[#564F47]!`}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
						<Typography variant="caption"> {`Latest Uploads`} </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ImageList cols={6} gap={8} sx={{ gridTemplateColumns: { xs: "repeat(2,1fr)!important", sm: "repeat(3,1fr)!important", md: "repeat(4,1fr)!important", lg: "repeat(6,1fr)!important", }, }}>
							{
								latestImages.map((img, i) => 
									<ImageListItem key={i}>
										<Image src={img} alt="product" width={200} height={200} style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover", }} loading="eager" />
									</ImageListItem>
								)
							}
						</ImageList>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={`bg-[#564F4712]! text-[#564F47]!`}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
						<Typography variant="caption"> {`Recent Products`} </Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Stack spacing={2}>
							{
								recentProducts.map((p: any) => (
									<>
										<Stack key={p.id} direction="row" spacing={2} alignItems="center">
											<Avatar  variant="square" src={p.images?.[0]?.secure_url} sx={{ width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 }, borderRadius: 1 }} />
											<Box>
												<Typography fontWeight={600} fontSize={{ xs: "13px", sm: "14px" }}> {p.product} </Typography>
												<Typography variant="body2" fontSize={{ xs: "11px", sm: "12px" }}> {p.folder} </Typography>
											</Box>
										</Stack>
										<Divider />
									</>
								))
							}
						</Stack>
					</AccordionDetails>
				</Accordion>
			</Box>
		</div>
	);

}