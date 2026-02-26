import HeaderPage from "@/app/admin/components/Header/HeaderPage";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <HeaderPage />
            {children}
        </>
    );
}