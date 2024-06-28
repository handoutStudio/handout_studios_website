import "@/styles/main.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Handout Studios",
	description: "Handout Studios Description here...!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${inter.className} dark:bg-[#2D333A]`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
