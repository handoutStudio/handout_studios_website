import gsap from 'gsap';
import React from 'react';
import { useEffect, useRef } from 'react';
import MagneticPage from '@/app/common/Magnetic/MagneticPage';
import styles from '@/app/common/RoundedButton/style.module.scss';

interface RoundedButtonPageProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	backgroundColor?: string;
	caller?: string;
}

export default function RoundedButtonPage({children, backgroundColor, caller, ...attributes}: RoundedButtonPageProps) {

	const circle = useRef<HTMLDivElement | null>(null);
	const timeline = useRef<gsap.core.Timeline | null>(null);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	useEffect( () => {
		timeline.current = gsap.timeline({paused: true})
		timeline.current
			.to(circle.current, {top: "-25%", width: "150%", duration: 0.4, ease: "power3.in"}, "enter")
			.to(circle.current, {top: "-150%", width: "125%", duration: 0.25}, "exit")
	}, [])
	
	const manageMouseEnter = () => {
		if(timeoutId) clearTimeout(timeoutId)
		if (timeline.current) {
			timeline.current.tweenFromTo('enter', 'exit');
		}
	}

	const manageMouseLeave = () => {
		timeoutId = setTimeout(() => {
			if (timeline.current) {
				timeline.current.play();
			}
		}, 300);
	};

	return (
		<>
			<MagneticPage>
				<div className={caller === 'earthline-made' ? styles.roundedButtonE : styles.roundedButton } style={{overflow: "hidden"}} onMouseEnter={() => {manageMouseEnter()}} onMouseLeave={() => {manageMouseLeave()}} {...attributes}>
					{ children }
					<div ref={circle} style={{backgroundColor}} className={styles.circle}></div>
				</div>
			</MagneticPage>
		</>
	)
}
