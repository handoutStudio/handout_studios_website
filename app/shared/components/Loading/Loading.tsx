'use client';

import { gsap } from 'gsap';
import * as THREE from "three";
import Image from "next/image";
import { useEffect, useRef } from 'react';
import earthlineLogo from '@/public/images/earthline_only_logo.png';
import handoutLogo from '@/public/Assets/logo/compressed/final stamp 1.svg';

export function Loading( { setIsLoading }: any ) {
	const containerRef = useRef<HTMLDivElement>(null);
	const flipRef = useRef<HTMLDivElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);
	const rippleRef = useRef<HTMLDivElement>(null);
	const threeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// -------------------------
		// THREE.JS PARTICLE FIELD
		// -------------------------
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		camera.position.z = 6;
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		threeRef.current?.appendChild(renderer.domElement);
		const particlesGeometry = new THREE.BufferGeometry();
		const particleCount = 800;
		const posArray = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 20; }
		particlesGeometry.setAttribute( "position", new THREE.BufferAttribute(posArray, 3) );
		const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: 0xc6bfb7, });
		const particlesMesh = new THREE.Points( particlesGeometry, particlesMaterial );
		scene.add(particlesMesh);
		const animateParticles = () => { particlesMesh.rotation.y += 0.0008; particlesMesh.rotation.x += 0.0003; renderer.render(scene, camera); requestAnimationFrame(animateParticles); };
		animateParticles();
		// -------------------------
		// GSAP TIMELINE
		// -------------------------
		let rippleTriggered = false;
		const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
		tl.to(glowRef.current, { scale: 1.3, opacity: 0.6, duration: 0.6, ease: "power2.out" });
		tl.to(flipRef.current, { z: 60, duration: 0.4, ease: "power3.out" });
		tl.to(flipRef.current, {
			rotationY: "+=180", duration: 1.2, ease: "power2.inOut", transformPerspective: 1400,
			onUpdate: function () {
				const progress = this.progress();
				if (!rippleTriggered && progress > 0.5) {
					rippleTriggered = true;
					// Ripple
					gsap.fromTo( rippleRef.current, { scale: 0.2, opacity: 0.6 }, { scale: 2, opacity: 0, duration: 0.8, ease: "power2.out" } );
				}
			},
			onComplete: () => { rippleTriggered = false; }
		});
		tl.to(flipRef.current, { z: 0, duration: 0.5, ease: "power3.out" });
		tl.to(glowRef.current, { scale: 1, opacity: 0.3, duration: 0.6, ease: "power2.out" });
		return () => { renderer.dispose(); tl.kill(); };
	}, []);

	setTimeout(() => {
		setIsLoading(false);
	}, 2500);

	return (
		<div ref={containerRef} className="flex justify-center items-center w-screen h-screen overflow-hidden" style={{ backgroundColor: "#EDE8E4", perspective: 1400 }}>
			{/* THREE BACKGROUND */}
			<div ref={threeRef} className="absolute inset-0" />
			{/* ENERGY GLOW */}
			<div ref={glowRef} className="absolute w-125 h-125 rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(180,160,140,0.4) 0%, transparent 60%)" }} />
			{/* RIPPLE */}
			<div ref={rippleRef} className="absolute w-96 h-96 rounded-full opacity-0" style={{ border: "2px solid rgba(180,160,140,0.5)" }} />
			{/* FLIP CONTAINER */}
			<div ref={flipRef} className="relative w-52 h-52" style={{ transformStyle: "preserve-3d" }}>
				<div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
					<Image src={handoutLogo} alt="handout studios" fill className="object-contain" />
				</div>
				<div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
					<Image src={earthlineLogo} alt="earthline made" fill className="object-contain rounded-full" />
				</div>
			</div>
		</div>
	);
}