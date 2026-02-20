'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { motion, Easing } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import RoundedPage from '@/app/common/RoundedButton/RoundedButtonPage';
import styles from '@/app/components/Projects/style.module.scss';
import ProjectPage from '@/app/components/Projects/components/project/ProjectPage';

const projects = [
	{ title: "C2 Montreal", src: "c2montreal.png", color: "#000000" },
	{ title: "Office Studio", src: "officestudio.png", color: "#8C8C8C" },
	{ title: "Locomotive", src: "locomotive.png", color: "#EFE8D3" },
	{ title: "Silencio", src: "silencio.png", color: "#706D63" }
]

const scaleAnimation = {
	initial: {scale: 0, x:"-50%", y:"-50%"},
	enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1] as Easing}},
	closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0] as Easing}}
}

type QuickToFunction = (value: number) => void;

export default function Home() {

	const [modal, setModal] = useState({active: false, index: 0})
	const cursor = useRef(null);
	const { active, index } = modal;
	const cursorLabel = useRef(null);
	const modalContainer = useRef(null);

	const xMoveCursor = useRef<QuickToFunction | null>(null);
	const yMoveCursor = useRef<QuickToFunction | null>(null);
	const xMoveContainer = useRef<QuickToFunction | null>(null);
	const yMoveContainer = useRef<QuickToFunction | null>(null);
	const xMoveCursorLabel = useRef<QuickToFunction | null>(null);
	const yMoveCursorLabel = useRef<QuickToFunction | null>(null);

	useEffect(() => {
		//Move cursor
		yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
		xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
		//Move cursor label
		yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
		xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
		//Move Container
		yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
		xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
	}, [])

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const moveItems = (x: any, y: any) => {
		xMoveCursor.current?.(x);
		yMoveCursor.current?.(y);
		xMoveContainer.current?.(x);
		yMoveContainer.current?.(y);
		xMoveCursorLabel.current?.(x);
		yMoveCursorLabel.current?.(y);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const manageModal = ({active, index, x, y}: any) => { moveItems(x, y); setModal({active, index}); }

	return (
	<main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
		<div className={styles.body}>
			{ projects.map( (project, index) => <ProjectPage index={index} title={project.title} manageModal={manageModal} key={index}/> ) }
		</div>
		<RoundedPage>
			<p>{`More work`}</p>
		</RoundedPage>
		<>
			<motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
				<div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
					{ projects.map( (project, index) => <div className={styles.modal} style={{backgroundColor: project.color}} key={`modal_${index}`}> <Image src={`/images/${project.src}`} width={300} height={0} alt="image" /> </div> ) }
				</div>
			</motion.div>
			<motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
			<motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
		</>
	</main>
	)
}
