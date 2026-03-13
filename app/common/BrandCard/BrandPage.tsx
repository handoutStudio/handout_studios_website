"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useEffect, useRef,useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import handoutLogo from "@/public/images/background.svg";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Loading } from '@/app/shared/components/Loading/Loading';
import earthlineLogo from "@/public/images/earthline_made_landing_image_mobile.png";

export default function BrandPage() {

	const earthOrbitRef = useRef<HTMLDivElement>(null);
	const mercuryOrbitRef = useRef<HTMLDivElement>(null);

	const earthRef = useRef<HTMLDivElement>(null);
	const mercuryRef = useRef<HTMLDivElement>(null);

	const earthTween = useRef<gsap.core.Tween | null>(null);
	const mercuryTween = useRef<gsap.core.Tween | null>(null);

	const router = useRouter();

	const pathname = usePathname();
	const prevPath = useRef(pathname);

	const [getIsLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (prevPath.current !== pathname) {
			setIsLoading(false);
			resumeOrbits();
			prevPath.current = pathname;
		}
	}, [pathname]);

	useEffect(() => {

		/* ----------------------------------
		ORBIT ANIMATIONS
		---------------------------------- */
		if (!earthOrbitRef.current || !mercuryOrbitRef.current) return;

		earthTween.current = gsap.to(earthOrbitRef.current, {
			rotation: 360, duration: 35, ease: "linear", repeat: -1, transformOrigin: "center center",
			onUpdate: () => { const r = gsap.getProperty(earthOrbitRef.current!, "rotation") as number; gsap.set(earthRef.current, { rotation: -r }); }
		});

		mercuryTween.current = gsap.to(mercuryOrbitRef.current, {
			rotation: 360, duration: 15, ease: "linear", repeat: -1, transformOrigin: "center center",
			onUpdate: () => { const r = gsap.getProperty(mercuryOrbitRef.current!, "rotation") as number; gsap.set(mercuryRef.current, { rotation: -r }); }
		});

		/* ----------------------------------
		MILKY WAY GALAXY SYSTEM
		---------------------------------- */
		const galaxy = document.getElementById("milkyway");
		if (!galaxy) return;
		const width = window.innerWidth;
		const height = window.innerHeight;
		const starLayers = [ { count: width < 640 ? 120 : 200, depth: 0.3, size: 0.7 }, { count: width < 640 ? 90 : 160, depth: 0.6, size: 1.2 }, { count: width < 640 ? 60 : 120, depth: 1, size: 1.8 } ];
		const arms = 4;
		const maxRadius = Math.min(width, height) * 0.7;

		/* ----------------------------------
		STAR GENERATION
		---------------------------------- */
		starLayers.forEach(layer => {
			for (let i = 0; i < layer.count; i++) {
				const star = document.createElement("div");
				const size = Math.random() * layer.size + 0.4;
				star.style.position = "absolute";
				star.style.width = `${size}px`;
				star.style.height = `${size}px`;
				star.style.borderRadius = "50%";
				star.style.background = "#7A0007";
				galaxy.appendChild(star);
				const r = Math.pow(Math.random(), 0.55) * maxRadius;
				const arm = i % arms;
				const angle = r * 0.018 + (arm * (Math.PI * 2 / arms)) + Math.random() * 0.5;
				const x = Math.cos(angle) * r;
				const y = Math.sin(angle) * r;
				gsap.set(star, { left: "50%", top: "50%", x, y, opacity: gsap.utils.random(0.3, 0.9), scale: layer.depth });
				/* Galaxy disk rotation */
				gsap.to(star, { rotation: 360, transformOrigin: `${-x}px ${-y}px`, duration: gsap.utils.random(220, 420), repeat: -1, ease: "none" });
				/* Twinkle */
				gsap.to(star, { opacity: gsap.utils.random(0.4, 1), duration: gsap.utils.random(2, 4), repeat: -1, yoyo: true, ease: "sine.inOut" });
			}
		});


		/* ----------------------------------
		GALACTIC CORE
		---------------------------------- */
		const core = document.getElementById("galaxy-core");
		if (core) {
			core.style.width = "120px";
			core.style.height = "120px";
			core.style.borderRadius = "50%";
			core.style.background = "radial-gradient(circle, rgba(122,0,7,0.45) 0%, rgba(122,0,7,0.15) 40%, transparent 70%)";
			core.style.transform = "translate(-50%, -50%)";
			core.style.filter = "blur(25px)";
			gsap.to(core, { scale: 1.2, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
		}


		/* ----------------------------------
		NEBULA FIELDS
		---------------------------------- */
		["nebula-1", "nebula-2", "nebula-3"].forEach((id, i) => {
			const nebula = document.getElementById(id);
			if (!nebula) return;
			const size = window.innerWidth * (0.5 + i * 0.2);
			nebula.style.width = `${size}px`;
			nebula.style.height = `${size}px`;
			nebula.style.left = `${20 + i * 25}%`;
			nebula.style.top = `${20 + i * 15}%`;
			nebula.style.borderRadius = "50%";
			nebula.style.background = "radial-gradient(circle, rgba(122,0,7,0.12) 0%, rgba(122,0,7,0.05) 40%, transparent 70%)";
			nebula.style.filter = "blur(90px)";
			nebula.style.transform = "translate(-50%, -50%)";
			gsap.to(nebula, { x: "+=40", y: "+=30", duration: 60 + i * 20, repeat: -1, yoyo: true, ease: "sine.inOut" });
		});


		/* ----------------------------------
		PARALLAX DRIFT
		---------------------------------- */
		gsap.to("#milkyway", { rotation: 360, transformOrigin: "50% 50%", duration: 900, repeat: -1, ease: "none" });

		return () => { earthTween.current?.kill(); mercuryTween.current?.kill(); };

	}, []);

	/* ----------------------------------
	ORBIT CONTROL
	---------------------------------- */
	const pauseOrbits = () => { earthTween.current?.pause(); mercuryTween.current?.pause(); };

	const resumeOrbits = () => { earthTween.current?.resume(); mercuryTween.current?.resume(); };

	/* ----------------------------------
	ADMIN LOGIN
	---------------------------------- */
	const handleAdminLogin = async () => { pauseOrbits(); setIsLoading(true); await signIn("google", { callbackUrl: "/admin" }); };

	/* ----------------------------------
	Earth-line Made Page
	---------------------------------- */
	const earthlineMadePage = () => { pauseOrbits(); setIsLoading(true); router.push("/earthline-made"); };

	return (

		getIsLoading
		?
			<Loading setIsLoading={setIsLoading} />
		:

			<div className="h-screen w-screen bg-[#EDE8E4] flex items-center justify-center relative overflow-hidden">
				<div id="milkyway" className="absolute inset-0 z-0 pointer-events-none">
					<div id="galaxy-core" className="absolute left-1/2 top-1/2"></div>
					<div id="nebula-1" className="absolute"></div>
					<div id="nebula-2" className="absolute"></div>
					<div id="nebula-3" className="absolute"></div>
				</div>
				
				<div className="relative w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-200 aspect-square flex items-center justify-center">

					{/* MERCURY ORBIT */}
					<div ref={mercuryOrbitRef} className="absolute w-[60%] h-[60%] rounded-full border border-[#564F47]/20 pointer-events-none z-10">
						<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
							{/* <div ref={mercuryRef} onMouseEnter={pauseOrbits} onMouseLeave={resumeOrbits} onClick={handleAdminLogin} className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#564F47] shadow-lg cursor-pointer hover:scale-110 transition" title="Admin Login" /> */}
							<div ref={mercuryRef} onMouseEnter={pauseOrbits} onMouseLeave={resumeOrbits} onClick={handleAdminLogin} className="relative flex flex-col items-center cursor-pointer" title="Admin Login">
								<div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#FFFFFF] shadow-lg flex items-center justify-center">
									<FingerprintIcon fontSize="large" className="text-[#7A0007] text-[18px] sm:text-[20px] md:text-[22px]" />
								</div>
								<div className="mt-2 text-[10px] sm:text-xs uppercase text-[#7A0007]"> {'Admin'} </div>
							</div>
						</div>
					</div>

					{/* EARTH ORBIT */}
					<div ref={earthOrbitRef} className="absolute w-full h-full rounded-full border border-[#564F47] opacity-40 pointer-events-none z-0">
						<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
							<div ref={earthRef} onMouseEnter={pauseOrbits} onMouseLeave={resumeOrbits} onClick={earthlineMadePage} className="relative flex flex-col items-center cursor-pointer">
								<div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-xl">
									<Image src={earthlineLogo} alt="Earthline Made" fill className="object-cover" />
								</div>
								<div className="mt-2 text-xs uppercase text-[#7A0007]"> {`by Handout Studios`} </div>
							</div>
						</div>
					</div>

					{/* SUN */}
					<div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-pointer" onClick={() => router.push("/")}>
						<Image src={handoutLogo} alt="Handout Studios" fill className="object-contain p-3" />
					</div>

				</div>
			</div>
	);
}