import HeaderPage from "@/app/components/Header/HeaderPage";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<>
			<HeaderPage caller="earthline-made" />
			{children}
		</>
	);
}