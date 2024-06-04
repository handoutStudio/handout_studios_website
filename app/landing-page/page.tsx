'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function Page() {

	const router = useRouter();
	const handleLoginClick = () => {
		router.push('/login');
	}

	return (
		<div>
			{/* TODO: Login Page */}
			<Button variant="contained" onClick={handleLoginClick}>Hello world</Button>
		</div>
	);
}