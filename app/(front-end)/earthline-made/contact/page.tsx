'use client';

import Lenis from 'lenis';
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ContactUsPage from '@/app/common/ContactUs/ContactUs';
import PreloaderPage from '@/app/components/Preloader/PreloaderPage';

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);

    const words: string[] = [ "Contact Us...!", "Contactez-nous...!", "Contattaci...!", "Entre em Contato...!", "Contáctanos...!", "Kontaktieren Sie uns...!", "Neem contact met ons op...!", "Kontakta oss...!", "お問い合わせ...!", "اتصل بنا...!", "문의하기...!", "联系我们...!", "संपर्क करें...!", "અમારો સંપર્ક કરો...!" ];

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