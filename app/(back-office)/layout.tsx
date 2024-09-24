'use client';

import * as React from 'react';
import Navbar from '@/components/backoffice/Navbar';
import Footer from '@/components/backoffice/Footer';
import Sidebar from '@/components/backoffice/Sidebar';

export default function Layout({ children }: any) {

	return (
		<div className={`flex`}>

			{/* TODO: Navbar Here...! */}
			<Navbar />

			{/* TODO: Sidebar Here...! */}
			<Sidebar />

			<div className={`w-full`}>

				{/* TODO: Main Here...! */}
				<main className={`min-[500px]:p-8 p-5 text-[#7c0104] min-h-[91.5vh] mt-20`}>
					<div>
						{ children }
					</div>
					<div className={`p-2`}>
						{/* TODO: Footer Here...! */}
						<Footer />
					</div>
				</main>

			</div>
		</div>
	)
}