'use client';

import Lenis from 'lenis';
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/beige.css";
import { useState, useEffect } from "react";
import Divider from '@mui/material/Divider';
import { AnimatePresence } from "framer-motion";
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';


const OurMission = () => {

    const [isLoading, setIsLoading] = useState(true);

    const words: string[] = [ "Our Mission...!", "Notre Mission...!", "La Nostra Missione...!", "Nossa Missão...!", "Nuestra Misión...!", "Unsere Mission...!", "Onze Missie...!", "Vårt Uppdrag...!", "私たちの使命...!", "مهمتنا...!", "우리의 사명...!", "我们的使命...!", "हमारा मिशन...!", "અમારું ધ્યેય...!" ];

    const cardContents = [ { srno: "1.", title: "From Waste to Wonder", caption: "Turning discarded materials into timeless art.", body: "We transform waste such as paper bags, plastic bottles, and other recycled materials into sustainable décor and furniture. Each piece is handcrafted to give new life to what would otherwise be discarded.", }, { srno: "2.", title: "Crafted for You", caption: "Custom designs that reflect your space and story.", body: "We don't mass-produce. Every product is made to order, tailored to your needs, style, and space — ensuring it's unique and meaningful to you.", }, { srno: "3.", title: "Your Waste, Our Canvas", caption: "Give us your paper bags, we'll give you art.", body: "We invite you to collect and share your paper waste with us. We'll turn it into functional, beautiful art pieces — a creative way to recycle and contribute to sustainability", }, ];

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
        const initializeReveal = async () => {
            const Reveal = (await import('reveal.js')).default;
            deck = new Reveal({ controls: true, progress: true, history: true, center: true, loop: false, autoSlide: 50000, transition: 'slide' });
            await deck.initialize();
        };
        initializeReveal();
        return () => {
            if (deck) deck.destroy();
        };
    }, []);

    return (
        <div className={`h-svh`}>
            <AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={words} caller='earthline-made' />} </AnimatePresence>
            <>
                <div className="reveal bg-[#EDE8E4] text-[#564F47]!">
                    <div className="slides">
                        <section>
                            <h3 className={`text-start`}> <a href='#'> {`Our Mission`} </a> </h3>
                            {
                                cardContents.map((cardContent: any, i: number) => {
                                    return (
                                        <div key={i}>
                                            <div className={`text-start`}>
                                                <h4 className='text-[#564F47]'>{ cardContent.srno + ' ' + cardContent.title }</h4>
                                                <p className={`text-lg`}>{ cardContent.caption }</p>
                                                <p className={`text-xl`}>{ cardContent.body }</p>
                                            </div>
                                            <Divider />
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </div>
                </div>
            </>
        </div>
    );
};

export default OurMission;