'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function Page() {

	const router = useRouter();
	const handleDashboardClick = () => {
		router.push('/');
	}

	return (
		<>
			<div>
				{/* TODO: Login Page */}
				<Button variant="contained" onClick={handleDashboardClick}>Hello world</Button>
			</div>
		</>
	);
}