'use client';

import * as React from 'react';
// import { IconButton } from '@mui/material';
import Navbar from '@/components/backoffice/Navbar';
import Footer from '@/components/backoffice/Footer';
import Sidebar from '@/components/backoffice/Sidebar';
// import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function Layout({ children }: any) {

	// const [open, setOpen] = React.useState(false);
	// const handleDrawerClose = () => setOpen(!open);

	return (
		<div className={`flex`}>

			{/* TODO: Navbar Here...! */}
			<Navbar />

			{/* TODO: Sidebar Here...! */}
			<Sidebar />

			<div className={`w-full`}>

				{/* <div className={`fixed top-[8.5vh] ${ open ? 'left-[11.5vw]' : 'left-[2.5vw]' } duration-200 bg-red-600 rounded-full`}>
					<IconButton className={`flex items-end justify-end w-full`} onClick={handleDrawerClose}>
						{ open === false ? <ChevronRight className={`text-white ml-2`} /> : <ChevronLeft className={`text-white ml-3`} /> }
					</IconButton>
				</div> */}

				{/* TODO: Main Here...! */}
				<main className={`p-8 text-[#7c0104] min-h-screen mt-16`}> { children } </main>

				{/* TODO: Footer Here...! */}
				<Footer />
			</div>

			{/* TODO: Main Body Here...! */}

		</div>
	)
}