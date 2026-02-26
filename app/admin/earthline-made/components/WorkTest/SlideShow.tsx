'use client';

import Lenis from 'lenis';
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/beige.css";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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

    const [isLoading, setIsLoading] = useState(true);

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
            <AnimatePresence mode='wait'> {isLoading && <PreloaderPage words={words} caller='earthline-made' />} </AnimatePresence>

            <>
                <div className="reveal">
                    <div className="slides">
                        <section>
                            <div className={`flex items-center justify-center h-svh ml-[-14vw] mt-[-2vw] gap-20`}>
                                <img src={earthlineLanding.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
                                <div className={`flex flex-col w-full`}>
                                    <h2 className={`relative top-20 left-40`}> <a href='#'> {`earth-line.made`} </a> </h2>
                                    <h3 className={`text-3xl! relative top-15 left-75`}>{`Sustainable art for timeless space`}</h3>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className={`flex items-center justify-center h-svh mt-[-4vw] mr-[-14vw] gap-20`}>
                                <div className={`flex flex-col ml-[-10vw]`}>
                                    <h2 className={`text-start`}> <a href='#'>{`About US`} </a> </h2>
                                    <p className={`text-2xl text-start`}>{`Earth Line creates sustainable décor and furniture using papermâché and recycled materials. Each piece is handcrafted, combining natural textures with modern design. Our work reflects a commitment to eco-friendly practices, quality craftsmanship, and timeless style — offering art that is both beautiful and responsible.`}</p>
                                </div>
                                <img src={earthlineAboutUs.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
                            </div>
                        </section>

                        <section>
                            <h3 className={`text-start`}> <a href='#'> {`Our Mission`} </a> </h3>
                            <div className={`text-start`}>
                                <h4>{`1. From Waste to Wonder...!`}</h4>
                                <p className={`text-lg`}>{`Turning discarded materials into timeless art.`}</p>
                                <p className={`text-2xl`}>{`We transform waste such as paper bags, plastic bottles, and other recycled materials into sustainable décor and furniture. Each piece is handcrafted to give new life to what would otherwise be discarded.`}</p>
                            </div>

                            <div className={`text-start`}>
                                <h4>{`2. Crafted for You...!`}</h4>
                                <p className={`text-lg`}>{`Custom designs that reflect your space and story.`}</p>
                                <p className={`text-2xl`}>{`We don't mass-produce. Every product is made to order, tailored to your needs, style, and space — ensuring it's unique and meaningful to you.`}</p>
                            </div>

                            <div className={`text-start`}>
                                <h4>{`3. Your Waste, Our Canvas...!`}</h4>
                                <p className={`text-lg`}>{`Give us your paper bags, we'll give you art.`}</p>
                                <p className={`text-2xl`}>{`We invite you to collect and share your paper waste with us. We'll turn it into functional, beautiful art pieces — a creative way to recycle and contribute to sustainability.`}</p>
                            </div>
                        </section>

                        <section>
                            <h3 className={`text-start`}> <a href='#'> {`Vase Trio`} </a> </h3>
                            <p className={`text-lg text-start`}>{`A handcrafted collection of organic, wavy, and hollow-ring forms in paper-mâché, made from recycled materials to bring sustainable elegance to any space.`}</p>
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
                                    <h3 className={`text-start`}> <a href='#'> {`Pebble Gaze`} </a> </h3>
                                    <p className={`text-lg text-start`}>{`Handcrafted from recycled paper-mâché, this organic-shaped mirror blends art and function. Its smooth, pebble-like contours and natural texture embrace the beauty of imperfection, making it a statement piece for wabi-sabi and modern interiors. Lightweight yet sturdy, it's perfect for adding depth, light, and earthy elegance to any corner of your home.`}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className={`flex items-center justify-center h-svh mt-[-4vw] mr-[-14vw] gap-20`}>
                                <div className={`flex flex-col ml-[-10vw]`}>
                                    <h2 className={`text-start`}> <a href='#'>{`Terra Gaze`} </a> </h2>
                                    <p className={`text-2xl text-start`}>{`Handcrafted paper-mâché frame with natural curves, bringing sustainable elegance to any space.`}</p>
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
                                    <h3 className={`text-start`}> <a href='#'> {`Earthen Hues`} </a> </h3>
                                    <p className={`text-lg text-start`}>{`A series of sculptural mirrors handcrafted in papier-mâché, exploring the relationship between colour, texture, and form. Each piece is shaped by hand, allowing imperfections to guide the final object rather than correct it.`}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className={`flex items-center justify-center h-svh mt-[-4vw] mr-[-14vw] gap-20`}>
                                <div className={`flex flex-col ml-[-10vw]`}>
                                    <h2 className={`text-start`}> <a href='#'>{`How To order`} </a> </h2>
                                    <div className={`flex flex-col gap-5 text-start`}>
                                        <ul className={`text-2xl`}>
                                            <li>{`Share Your Idea - Send us your requirements or inspiration.`}</li>
                                            <li>{`Approve the Design - We send you the concept & quote.`}</li>
                                            <li>{`Receive Your Piece - Your handcrafted art, made just for you.`}</li>
                                        </ul>
                                        <div className={`flex flex-col text-start`}>
                                            <h4>{`Let's create something unique for your space.`}</h4>
                                            <div className={`flex justify-start items-center gap-20 text-xl`}>
                                                <a href='#'>{`Instagram`}</a>
                                                <p>{`@earthline.made`}</p>
                                            </div>
                                            <div className={`flex justify-start items-center gap-20 text-xl`}>
                                                <a href='#'>{`Email Address`}</a>
                                                <p>{`handoutstudio3@gmail.com`}</p>
                                            </div>
                                            <div className={`flex justify-start items-center gap-20 text-xl`}>
                                                <a href='#'>{`Phone Number`}</a>
                                                <p>{`(+91) - 823 - 800 - 4301`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img src={HowToOrder.src} alt="earth-line.made" className={`flex justify-center w-1/2 items-center`} />
                            </div>
                        </section>

                        <section>
                            <h2>Thank You!</h2>
                        </section>

                    </div>
                </div>
            </>
        </div>
    );
};

export default SlideShow;