import * as React from 'react';
import Navbar from '@/components/backoffice/Navbar';
import Footer from '@/components/backoffice/Footer';
import Sidebar from '@/components/backoffice/Sidebar';

export default function Layout({ children }: any) {
	return (
		<div className={`flex`}>

			<Navbar />

			{/* TODO: Sidebar Here...! */}
			<Sidebar />

			<div className={`w-full`}>

				{/* TODO: Main Here...! */}
				<main className={`p-8 bg-white text-white min-h-screen mt-16`}> { children } </main>

				{/* TODO: Footer Here...! */}
				<Footer />
			</div>

			{/* TODO: Main Body Here...! */}

		</div>
	)
}