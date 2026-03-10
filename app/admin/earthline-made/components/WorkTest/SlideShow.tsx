'use client';

import Lenis from 'lenis';
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/beige.css";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import useScreenSize from '@/app/lib/useScreenSize';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';
import styles from "@/app/admin/earthline-made/components/WorkTest/style.module.scss";

// Images import
import EarthenHues from '@/public/images/earthline_Products/IMG_4324.png';
import earthlineAboutUs from '@/public/images/earthline_Products/IMG_8673.png';
import Vase1 from '@/public/images/earthline_Products/F55E8C6B-54BD-44ED-BBAC-C3FF1094E8C8.png';
import Vase2 from '@/public/images/earthline_Products/8A719692-92E2-47F2-8792-E709BBC2DF24.png';
import Vase3 from '@/public/images/earthline_Products/25B5560B-79EC-4480-8520-ABA3E1F7EEB2.png';
import TerraGaze from '@/public/images/earthline_Products/177DB259-670D-42ED-9C53-CF5C2C1257B8.png';
import PebbleGaze from '@/public/images/earthline_Products/7479517B-0FCF-40C3-851F-AF28D28C8A3F.png';
import HowToOrder from '@/public/images/earthline_Products/436E3926-5A3A-41C1-B2AB-7665281346A4.png';
import earthlineLanding from '@/public/images/earthline_Products/7F3FEB94-77BD-4A61-A083-5215AF28604B.png';


const SlideShow = () => {

	const data: any = [
		{
			title: "earth-line.made",
			subtitle: "Sustainable art for timeless space"
		},
		{
			title: "About US",
			subtitle: "Earth Line creates sustainable décor and furniture using papermâché and recycled materials. Each piece is handcrafted, combining natural textures with modern design. Our work reflects a commitment to eco-friendly practices, quality craftsmanship, and timeless style — offering art that is both beautiful and responsible.",
		},
		{
			title: "Our Mission",
			subtitle: [
				{
					title: "1. From Waste to Wonder...!",
					subtitle: "Turning discarded materials into timeless art.",
					content: "We transform waste such as paper bags, plastic bottles, and other recycled materials into sustainable décor and furniture. Each piece is handcrafted to give new life to what would otherwise be discarded.",
				},
				{
					title: "2. Crafted for You...!",
					subtitle: "Custom designs that reflect your space and story.",
					content: "We don't mass-produce. Every product is made to order, tailored to your needs, style, and space — ensuring it's unique and meaningful to you.",
				},
				{
					title: "3. Your Waste, Our Canvas...!",
					subtitle: "Give us your paper bags, we'll give you art.",
					content: "We invite you to collect and share your paper waste with us. We'll turn it into functional, beautiful art pieces — a creative way to recycle and contribute to sustainability.",
				},
			]
		},
		{
			title: "Vase Trio",
			subtitle: "A handcrafted collection of organic, wavy, and hollow-ring forms in paper-mâché, made from recycled materials to bring sustainable elegance to any space.",
		},
		{
			title: "Pebble Gaze",
			subtitle: "Handcrafted from recycled paper-mâché, this organic-shaped mirror blends art and function. Its smooth, pebble-like contours and natural texture embrace the beauty of imperfection, making it a statement piece for wabi-sabi and modern interiors. Lightweight yet sturdy, it's perfect for adding depth, light, and earthy elegance to any corner of your home."
		},
		{
			title: "Terra Gaze",
			subtitle: "Handcrafted paper-mâché frame with natural curves, bringing sustainable elegance to any space."
		},
		{
			title: "Earthen Hues",
			subtitle: "A series of sculptural mirrors handcrafted in papier-mâché, exploring the relationship between colour, texture, and form. Each piece is shaped by hand, allowing imperfections to guide the final object rather than correct it."
		},
		{
			title: "How To order",
			subtitle: [
				{
					title: "Share Your Idea - Send us your requirements or inspiration.",
				},
				{
					title: "Approve the Design - We send you the concept & quote.",
				},
				{
					title: "Receive Your Piece - Your handcrafted art, made just for you.",
				}
			],
			title2: "Let's create something unique for your space.",
			subtitle2: [
				{
					title: "Instagram",
					content: "@earthline.made",
				},
				{
					title: "Email",
					content: "handoutstudio3@gmail.com",
				},
				{
					title: "Phone",
					content: "(+91) - 823 - 800 - 4301",
				}
			]
		},
		{
			title: "Thank You!",
		},
	];

	const [isLoading, setIsLoading] = useState(true);

	// check if the screen is Mobile or Tablet or Desktop
	const screenSize = useScreenSize();

	const isMobile = screenSize?.width && screenSize.width <= 450;
	const isTablet = screenSize?.width && screenSize.width >= 451 && screenSize.width <= 1599;
	const isDesktop = screenSize?.width && screenSize.width >= 1600;

	const words: string[] = [ "Crafted From Waste...!", "Créé à partir de déchets...!", "Creato dai rifiuti...!", "Criado a partir de resíduos...!", "Creado a partir de residuos...!", "Aus Abfall erschaffen...!", "Gemaakt van afval...!", "Skapat av avfall...!", "廃棄物から生まれたアート...!", "مصنوع من النفايات...!", "폐기물에서 탄생한 작품...!", "由废弃物创造的艺术...!", "कचरे से बना कला...!", "કચરાથી બનેલી કલા...!" ];

	/* ---------------- LENIS ---------------- */
	useEffect(() => {
		const lenis = new Lenis();
		let rafId: number;
		function raf(time: number) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
		rafId = requestAnimationFrame(raf);
		setTimeout(() => { setIsLoading(false); document.body.style.cursor = 'default'; window.scrollTo(0, 0); }, 3000);
		return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
	}, []);

	/* ---------------- REVEAL ---------------- */
	useEffect(() => {
		let deck: any;
		let isScrolling = false;
		let wheelHandler: any;
		const initializeReveal = async () => {
			const Reveal = (await import('reveal.js')).default;
			const Markdown = (await import('reveal.js/plugin/markdown/markdown')).default;
			const Highlight = (await import('reveal.js/plugin/highlight/highlight')).default;
			const Notes = (await import('reveal.js/plugin/notes/notes')).default;
			const Zoom = (await import('reveal.js/plugin/zoom/zoom')).default;
			deck = new Reveal({ controls: true, progress: true, history: true, center: true, loop: false, autoSlide: 50000, transition: 'slide', plugins: [Markdown, Highlight, Notes, Zoom],});
			await deck.initialize();
			/* ----- Mouse Wheel Navigation (like your HTML) ----- */
			wheelHandler = (event: WheelEvent) => {
				if (isScrolling) return;
				isScrolling = true;
				if (event.deltaY > 0) deck.navigateNext();
				else deck.navigatePrev();
				setTimeout(() => { isScrolling = false; }, 600);
			};
			window.addEventListener('wheel', wheelHandler, { passive: true });
		};
		initializeReveal();
		return () => {
			if (wheelHandler) window.removeEventListener('wheel', wheelHandler);
			if (deck) deck.destroy();
		};
	}, []);

		return (
			<div className={styles.main}>
				<AnimatePresence mode="wait"> {" "} {isLoading && ( <PreloaderPage words={words} caller="earthline-made" /> )}{" "} </AnimatePresence>

				<div className="reveal">
					<div className="slides">
						{
							data && data !== undefined && data.length > 0 && isMobile
							?
								<>
									<section>
										<div className="flex flex-col lg:flex-row items-center justify-center min-h-svh gap-10 lg:gap-20 px-6 lg:px-20">
											<img src={earthlineLanding.src} alt="earth-line.made" className="w-full sm:w-3/4 lg:w-1/2" />
											<div className="flex flex-col text-center lg:text-left">
												<h1 className="lg:ml-20"> <a href="#"> {data[0].title} </a> </h1>
												<h3 className="text-xl sm:text-2xl lg:text-3xl lg:ml-32"> {data[0].subtitle} </h3>
											</div>
										</div>
									</section>

									<section>
										<div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-svh gap-10 lg:gap-20 px-6 lg:px-20">
											<img src={earthlineAboutUs.src} alt="earth-line.made" className="w-150" />
											<div className="flex flex-col text-center lg:text-left max-w-xl">
												<h1> <a href="#"> {data[1].title} </a> </h1>
												<p className='text-4xl'> {data[1].subtitle} </p>
											</div>
										</div>
									</section>

									<section className="px-6 lg:px-24">
										<h1 className="text-start"> <a href="#"> {data[2].title} </a> </h1>
										<div className="space-y-8 mt-6 text-start">
											<div>
												<h3> {data[2].subtitle[0].title} </h3>
												<p className='text-3xl'> {data[2].subtitle[0].subtitle} </p>
												<p className='text-4xl'> {data[2].subtitle[0].content} </p>
											</div>
											<div>
												<h3> {data[2].subtitle[1].title} </h3>
												<p className='text-3xl'> {data[2].subtitle[1].subtitle} </p>
												<p className='text-4xl'> {data[2].subtitle[1].content} </p>
											</div>
											<div>
												<h3> {data[2].subtitle[2].title} </h3>
												<p className='text-3xl'> {data[2].subtitle[2].subtitle} </p>
												<p className='text-4xl'> {data[2].subtitle[2].content} </p>
											</div>
										</div>
									</section>

									<section className="px-6 lg:px-20">
										<h1 className="text-center lg:text-left"> <a href="#"> {data[3].title} </a> </h1>
										<p className="text-4xl text-start"> {data[3].subtitle} </p>
										<div className="flex flex-row lg:flex-col items-center justify-center gap-6 mt-6">
											<img src={Vase1.src} className="w-1/3 lg:w-1/4" />
											<img src={Vase2.src} className="w-1/3 lg:w-1/4" />
											<img src={Vase3.src} className="w-1/3 lg:w-1/4" />
										</div>
									</section>

									<section>
										<div className="flex flex-col lg:flex-row items-center justify-center min-h-svh gap-10 lg:gap-20 px-6 lg:px-20">
											<img src={PebbleGaze.src} alt="earth-line.made" className="w-150" />
											<div className="flex flex-col text-center">
												<h1> <a href="#"> {data[4].title} </a> </h1>
												<p className="text-4xl text-start"> {data[4].subtitle} </p>
											</div>
										</div>
									</section>

									<section>
										<div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-svh gap-10 lg:gap-20 px-6 lg:px-20">
											<img src={TerraGaze.src} alt="earth-line.made" className="w-150" />
											<div className="flex flex-col text-center">
												<h1> <a href="#"> {data[5].title} </a> </h1>
												<p className="text-4xl text-start"> {data[5].subtitle} </p>
												<div className="flex flex-row justify-center gap-4">
													<img src={TerraGaze.src} alt="earth-line.made" className={`size-100 object-none object-[70%_10%]`} />
													<img src={TerraGaze.src} alt="earth-line.made" className={`size-100 object-none object-[75%_50%]`} />
													<img src={TerraGaze.src} className={`size-100 object-none object-[80%_70%]`} alt="Description of image" />
												</div>
											</div>
										</div>
									</section>

									<section>
										<div className="flex flex-col lg:flex-row items-center justify-center min-h-svh gap-10 lg:gap-20 px-6 lg:px-20">
											<img src={EarthenHues.src} alt="earth-line.made" className="w-150" />
											<div className="flex flex-col text-center lg:text-left max-w-xl">
												<h1 className={`text-9xl!`}> <a href="#"> {data[6].title} </a> </h1>
												<p className="text-4xl text-start"> {data[6].subtitle} </p>
											</div>
										</div>
									</section>

									<section>
										<div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-svh gap-10 lg:gap-20 px-6 lg:px-20">
											<img src={HowToOrder.src} alt="earth-line.made" className="w-120" />
											<div className="flex flex-col text-center lg:text-left max-w-xl">
												<h2> <a href="#"> {data[7].title} </a> </h2>
												<ul className={`text-start text-5xl`}>
													<li> <strong> {data[7].subtitle[0].title.split("-")[0]} </strong> - {data[7].subtitle[0].title.split("-")[1]} </li>
													<li> <strong> {data[7].subtitle[1].title.split("-")[0]} </strong> - {data[7].subtitle[1].title.split("-")[1]} </li>
													<li> <strong> {data[7].subtitle[2].title.split("-")[0]} </strong> - {data[7].subtitle[2].title.split("-")[1]} </li>
												</ul>
												<br />
												<h4>{data[7].title2}</h4>
												<div className="mt-2 text-4xl bg-[#564F47] text-[#EDE8E4] px-2 rounded-lg w-170">
													<div className="flex justify-between align-center items-center">
														<p> {data[7].subtitle2[0].title} </p>
														<p> {data[7].subtitle2[0].content} </p>
													</div>

													<div className="flex justify-between align-center items-center">
														<p> {data[7].subtitle2[1].title} </p>
														<p> {data[7].subtitle2[1].content} </p>
													</div>

													<div className="flex justify-between align-center items-center">
														<p> {data[7].subtitle2[2].title} </p>
														<p> {data[7].subtitle2[2].content} </p>
													</div>
												</div>
											</div>
										</div>
									</section>

									<section>
										<h2 className="text-center"> {data[8].title} </h2>
									</section>
								</>
							:
								isTablet
								?
									<>
										<section>
											<div className="flex items-center justify-center h-full gap-12">
												<img src={earthlineLanding.src} alt="earth-line.made" className="w-[45%]" />
												<div className="flex flex-col w-[55%]">
													<h2 className="mb-6"> <a href="#">{data[0].title}</a> </h2>
													<h4 className="text-2xl"> {data[0].subtitle} </h4>
												</div>
											</div>
										</section>

										<section>
											<div className="flex items-center justify-center h-full gap-12">
												<div className="flex flex-col w-[55%]">
													<h2 className="text-start"> <a href="#"> {data[1].title} </a> </h2>
													<p className="text-xl text-start"> {data[1].subtitle} </p>
												</div>
												<img src={earthlineAboutUs.src} alt="earth-line.made" className="w-[45%]" />
											</div>
										</section>


										<section className="px-14">
											<h3 className="text-start"> <a href="#"> {data[2].title} </a> </h3>
											<div className="space-y-8 mt-6">
												<h4 className={`text-start`}> {data[2].subtitle[0].title} </h4>
												<p className="text-xl text-start"> {data[2].subtitle[0].subtitle} </p>
												<p className="text-2xl text-start"> {data[2].subtitle[0].content} </p>
												<h4 className={`text-start`}> {data[2].subtitle[1].title} </h4>
												<p className="text-xl text-start"> {data[2].subtitle[1].subtitle} </p>
												<p className="text-2xl text-start"> {data[2].subtitle[1].content} </p>
												<h4 className={`text-start`}> {data[2].subtitle[2].title} </h4>
												<p className="text-xl text-start"> {data[2].subtitle[2].subtitle} </p>
												<p className="text-2xl text-start"> {data[2].subtitle[2].content} </p>
											</div>
										</section>


										<section className="px-14">
											<h3 className="text-center"> <a href="#"> {data[3].title} </a> </h3>
											<p className="text-2xl text-start"> {data[3].subtitle} </p>
											<div className="flex items-center justify-center gap-8 mt-3">
												<img src={Vase1.src} className="w-[35%]" />
												<img src={Vase2.src} className="w-[35%]" />
												<img src={Vase3.src} className="w-[35%]" />
											</div>
										</section>


										<section>
											<div className="flex items-center justify-center h-full gap-12">
												<img src={PebbleGaze.src} alt="earth-line.made" className="w-[45%]" />
												<div className="flex flex-col w-[55%]">
													<h3> <a href="#"> {data[4].title} </a> </h3>
													<p className="text-2xl text-start"> {data[4].subtitle} </p>
												</div>
											</div>
										</section>


										<section>
											<div className="flex items-center justify-center h-full gap-12">
												<div className="flex flex-col w-[55%]">
													<h2> <a href="#"> {data[5].title} </a> </h2>
													<p className="text-xl text-start"> {data[5].subtitle} </p>
													<div className="flex gap-6 mt-4">
														<img src={TerraGaze.src} alt="earth-line.made" className={`size-60 object-none object-[75%_50%]`} />
														<img src={TerraGaze.src} alt="earth-line.made" className={`size-60 object-none object-[70%_15%]`} />
													</div>
													<img src={TerraGaze.src} className={`size-60 object-none object-[80%_70%]`} alt="Description of image" />
												</div>
												<img src={TerraGaze.src} alt="earth-line.made" className="w-[45%]" />
											</div>
										</section>


										<section>
											<div className="flex items-center justify-center h-full gap-12">
												<img src={EarthenHues.src} alt="earth-line.made" className="w-[45%]" />
												<div className="flex flex-col w-[55%]">
													<h2> <a href="#"> {data[6].title} </a> </h2>
													<p className="text-2xl text-start"> {data[6].subtitle} </p>
												</div>
											</div>
										</section>


										<section>
											<div className="flex items-center justify-center h-full gap-12">
												<div className="flex flex-col w-[55%]">
													<h2 className={`text-start`}> <a href="#"> {data[7].title} </a> </h2>
													<ul className="text-2xl space-y-2 text-start">
														<li> <strong> {data[7].subtitle[0].title.split("-")[0]} </strong> - {data[7].subtitle[0].title.split("-")[1]} </li>
														<li> <strong> {data[7].subtitle[1].title.split("-")[0]} </strong> - {data[7].subtitle[1].title.split("-")[1]} </li>
														<li> <strong> {data[7].subtitle[2].title.split("-")[0]} </strong> - {data[7].subtitle[2].title.split("-")[1]} </li>
													</ul>
													<div className="flex flex-col gap-2 mt-6 text-xl bg-[#564F47] rounded-xl text-[#EDE8E4] px-3">
														<div className="flex justify-between">
															<p> {data[7].subtitle2[0].title} </p>
															<p> {data[7].subtitle2[0].content} </p>
														</div>
														<div className="flex justify-between">
															<p> {data[7].subtitle2[1].title} </p>
															<p> {data[7].subtitle2[1].content} </p>
														</div>
														<div className="flex justify-between">
															<p> {data[7].subtitle2[2].title} </p>
															<p> {data[7].subtitle2[2].content} </p>
														</div>
													</div>
												</div>
												<img src={HowToOrder.src} className="w-[45%]" />
											</div>
										</section>

										<section>
											<h2 className="text-center"> {data[8].title} </h2>
										</section>
									</>
								:
									<>
										<section>
											<div className={`flex items-center justify-center h-svh ml-[-14vw] mt-[-2vw] gap-20`}>
												<img src={earthlineLanding.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
												<div className={`flex flex-col w-full`}>
													<h2 className={`relative top-20 left-40`}> <a href='#'> {data[0].title} </a> </h2>
													<h3 className={`text-3xl! relative top-15 left-75`}>{data[0].subtitle}</h3>
												</div>
											</div>
										</section>

										<section>
											<div className={`flex items-center justify-center h-svh mt-[-4vw] mr-[-14vw] gap-20`}>
												<div className={`flex flex-col ml-[-10vw]`}>
													<h2 className={`text-start`}> <a href='#'>{data[1].title} </a> </h2>
													<p className={`text-2xl text-start`}>{data[1].subtitle}</p>
												</div>
												<img src={earthlineAboutUs.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
											</div>
										</section>

										<section>
											<h3 className={`text-start`}> <a href='#'> {data[2].title} </a> </h3>
											<div className={`text-start`}>
												<h4>{data[2].subtitle[0].title}</h4>
												<p className={`text-lg`}>{data[2].subtitle[0].subtitle}</p>
												<p className={`text-2xl`}>{data[2].subtitle[0].content}</p>
											</div>

											<div className={`text-start`}>
												<h4>{data[2].subtitle[1].title}</h4>
												<p className={`text-lg`}>{data[2].subtitle[1].subtitle}</p>
												<p className={`text-2xl`}>{data[2].subtitle[1].content}</p>
											</div>

											<div className={`text-start`}>
												<h4>{data[2].subtitle[2].title}</h4>
												<p className={`text-lg`}>{data[2].subtitle[2].subtitle}</p>
												<p className={`text-2xl`}>{data[2].subtitle[2].content}</p>
											</div>
										</section>

										<section>
											<h3 className={`text-start`}> <a href='#'> {data[3].title} </a> </h3>
											<p className={`text-lg text-start`}>{data[3].subtitle}</p>
											<div className={`flex items-center justify-center gap-5`}>
												<img src={Vase1.src} alt="earth-line.made" className={`flex justify-center w-2/6 items-center`} />
												<img src={Vase2.src} alt="earth-line.made" className={`flex justify-center w-2/6 items-center`} />
												<img src={Vase3.src} alt="earth-line.made" className={`flex justify-center w-2/6 items-center`} />
											</div>
										</section>


										<section>
											<div className={`flex items-center justify-center h-svh ml-[-14vw] mt-[-2vw] gap-20`}>
												<img src={PebbleGaze.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
												<div className={`flex flex-col w-full`}>
													<h3 className={`text-start`}> <a href='#'> {data[4].title} </a> </h3>
													<p className={`text-lg text-start`}>{data[4].subtitle}</p>
												</div>
											</div>
										</section>

										<section>
											<div className={`flex items-center justify-center h-svh mt-[-4vw] mr-[-14vw] gap-20`}>
												<div className={`flex flex-col ml-[-10vw]`}>
													<h2 className={`text-start`}> <a href='#'>{data[5].title} </a> </h2>
													<p className={`text-2xl text-start`}>{data[5].subtitle}</p>
													<div className={`flex items-center justify-center gap-5`}>
														<img src={TerraGaze.src} alt="earth-line.made" className={`size-60 object-none object-[75%_50%]`} />
														<img src={TerraGaze.src} alt="earth-line.made" className={`size-60 object-none object-[70%_10%]`} />
														<img src={TerraGaze.src} className={`size-60 object-none object-[80%_70%]`} alt="Description of image" />
													</div>
												</div>
												<img src={TerraGaze.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
											</div>
										</section>

										<section>
											<div className={`flex items-center justify-center h-svh ml-[-14vw] mt-[-4vw] gap-20`}>
												<img src={EarthenHues.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
												<div className={`flex flex-col w-full`}>
													<h3 className={`text-start`}> <a href='#'> {data[6].title} </a> </h3>
													<p className={`text-lg text-start`}> {data[6].subtitle} </p>
												</div>
											</div>
										</section>

										<section>
											<div className={`flex items-center justify-center h-svh mt-[-4vw] mr-[-14vw] gap-20`}>
												<div className={`flex flex-col ml-[-10vw]`}>
													<h2 className={`text-start`}> <a href='#'> {data[7].title} </a> </h2>
													<div className={`flex flex-col gap-5 text-start`}>
														<ul className={`text-2xl`}>
															<li> <strong> {data[7].subtitle[0].title.split("-")[0]} </strong> - {data[7].subtitle[0].title.split("-")[1]}</li>
															<li> <strong> {data[7].subtitle[1].title.split("-")[0]} </strong> - {data[7].subtitle[1].title.split("-")[1]}</li>
															<li> <strong> {data[7].subtitle[2].title.split("-")[0]} </strong> - {data[7].subtitle[2].title.split("-")[1]}</li>
														</ul>
														<div className={`flex flex-col text-start`}>
															<h4>{data[7].title2}</h4>
															<div className="flex flex-col text-xl bg-[#564F47] rounded-xl text-[#EDE8E4] px-3">
																<div className={`flex justify-between items-center text-xl`}>
																	<p>{data[7].subtitle2[0].title}</p>
																	<p>{data[7].subtitle2[0].content}</p>
																</div>
																<div className={`flex justify-between items-center text-xl`}>
																	<p>{data[7].subtitle2[1].title}</p>
																	<p>{data[7].subtitle2[1].content}</p>
																</div>
																<div className={`flex justify-between items-center text-xl`}>
																	<p>{data[7].subtitle2[2].title}</p>
																	<p>{data[7].subtitle2[2].content}</p>
																</div>
															</div>
														</div>
													</div>
												</div>
												<img src={HowToOrder.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
											</div>
										</section>

										<section>
											<h2>{data[8].title}</h2>
										</section>
									</>
						}
					</div>
				</div>
			</div>
		);
};

export default SlideShow;