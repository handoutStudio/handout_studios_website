// Import global styles and fonts
import "@/styles/main.css";
// import Image from "next/image";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import notFound from "@/public/images/404_not_found.svg";
import NotFoundClient from "./common/NotFound/NotFoundClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {title: "404 - Page Not Found", description: "The page you are looking for does not exist." };

export default function GlobalNotFound() {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <NotFoundClient />
            </body>
            {/* <body className="min-h-screen! bg-linear-to-br! from-white! to-[#3f3d56]! flex! items-center! justify-center! px-6!">
                <div className="w-full! max-w-6xl! flex! flex-col-reverse! md:flex-row! items-center! justify-center! gap-12!">                
                    <div className="relative! w-full! max-w-md! md:max-w-lg! aspect-square!">
                        <Image src={notFound} alt="Page Not Found" fill priority className="object-contain" />
                    </div>
                    <div className="text-center! md:text-left! flex! flex-col! gap-6!">
                        <h1 className="text-3xl! sm:text-4xl! md:text-5xl! font-bold! text-[#3f3d56]!"> {`404 - Page Not Found`} </h1>
                        <p className="text-base! sm:text-lg! md:text-xl! text-gray-600!"> <i> {`The page you are looking for does not exist. `}</i> </p>
                        <a href="/" className="inline-block! px-6! py-3! bg-[#3f3d56]! text-white! font-semibold! rounded-xl! hover:scale-105! transition-transform! duration-300!" > {`Go Back Home`} </a>
                    </div>
                </div>
            </body> */}
        </html>
    );
}