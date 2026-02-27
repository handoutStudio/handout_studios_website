'use client';

import Lenis from 'lenis';
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ContactUsPage from '@/app/common/ContactUs/ContactUs';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    
    const words: string[] = [ "Our Products...!", "Nos Produits...!", "I Nostri Prodotti...!", "Nossos Produtos...!", "Nuestros Productos...!", "Unsere Produkte...!", "Onze Producten...!", "Våra Produkter...!", "私たちの製品...!", "منتجاتنا...!", "우리의 제품...!", "我们的产品...!", "हमारे उत्पाद...!", "અમારા ઉત્પાદનો...!"];

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

    return (
        <>
            <AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={ words } caller='earthline-made' />} </AnimatePresence>
            <ContactUsPage brand="EARTHLINE_MADE" />
        </>
    );
}