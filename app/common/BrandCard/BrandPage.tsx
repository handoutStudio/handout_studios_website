"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import handoutLogo from "@/public/images/background.svg";
import earthlineLogo from "@/public/images/earthline_made_landing_image_mobile.png";

export default function BrandPage() {

	const earthOrbitRef = useRef<HTMLDivElement>(null);
	const mercuryOrbitRef = useRef<HTMLDivElement>(null);

	const earthRef = useRef<HTMLDivElement>(null);
	const mercuryRef = useRef<HTMLDivElement>(null);

	const earthTween = useRef<gsap.core.Tween | null>(null);
	const mercuryTween = useRef<gsap.core.Tween | null>(null);

	const router = useRouter();

	/* ----------------------------------
	ORBIT ANIMATIONS
	---------------------------------- */
	useEffect(() => {

		if (!earthOrbitRef.current || !mercuryOrbitRef.current) return;

		earthTween.current = gsap.to(earthOrbitRef.current, {
			rotation: 360, duration: 35, ease: "linear", repeat: -1, transformOrigin: "center center",
			onUpdate: () => { const r = gsap.getProperty(earthOrbitRef.current!, "rotation") as number; gsap.set(earthRef.current, { rotation: -r }); }
		});

		mercuryTween.current = gsap.to(mercuryOrbitRef.current, {
			rotation: 360, duration: 15, ease: "linear", repeat: -1, transformOrigin: "center center",
			onUpdate: () => { const r = gsap.getProperty(mercuryOrbitRef.current!, "rotation") as number; gsap.set(mercuryRef.current, { rotation: -r }); }
		});

		return () => {
			earthTween.current?.kill();
			mercuryTween.current?.kill();
		};

	}, []);

	/* ----------------------------------
	ORBIT CONTROL
	---------------------------------- */
	const pauseOrbits = () => { earthTween.current?.pause(); mercuryTween.current?.pause(); };

	const resumeOrbits = () => { earthTween.current?.resume(); mercuryTween.current?.resume(); };

	/* ----------------------------------
	ADMIN LOGIN
	---------------------------------- */
	const handleAdminLogin = async () => { pauseOrbits(); await signIn("google", { callbackUrl: "/admin" }); };

	return (
		<div className="h-screen w-screen bg-[#EDE8E4] flex items-center justify-center relative overflow-hidden">
			<div className="relative w-[80vw] max-w-200 aspect-square flex items-center justify-center">

				{/* MERCURY ORBIT */}
				<div ref={mercuryOrbitRef} className="absolute w-[60%] h-[60%] rounded-full border border-[#564F47]/20 pointer-events-none z-10">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
						<div ref={mercuryRef} onMouseEnter={pauseOrbits} onMouseLeave={resumeOrbits} onClick={handleAdminLogin} className="relative w-10 h-10 rounded-full bg-[#564F47] shadow-lg cursor-pointer hover:scale-110 transition" title="Admin Login" />
					</div>
				</div>

				{/* EARTH ORBIT */}
				<div ref={earthOrbitRef} className="absolute w-full h-full rounded-full border border-[#564F47] opacity-40 pointer-events-none z-0">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
						<div ref={earthRef} onMouseEnter={pauseOrbits} onMouseLeave={resumeOrbits} onClick={() => router.push("/earthline-made")} className="relative flex flex-col items-center cursor-pointer">
							<div className="relative w-28 h-28 rounded-full overflow-hidden shadow-xl">
								<Image src={earthlineLogo} alt="Earthline Made" fill className="object-cover" />
							</div>
							<div className="mt-2 text-xs uppercase text-[#564F47]"> {`by Handout Studios`} </div>
						</div>
					</div>
				</div>

				{/* SUN */}
				<div className="relative z-10 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-pointer" onClick={() => router.push("/")}>
					<Image src={handoutLogo} alt="Handout Studios" fill className="object-contain p-3" />
				</div>

			</div>
		</div>
	);
}