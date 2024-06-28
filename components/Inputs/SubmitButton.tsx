'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export function Buttons({classes, handleSubmit, startIcon, endIcon, size, buttonText}: any) {

	const router = useRouter();
	const submitClass = 'bg-red-700 w-40 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-500 flex justify-around';
	const cancelClass = 'bg-gray-50 w-40 hover:bg-gray-50 text-red-700 dark:text-red-500 flex justify-around';

	return (
		<Button className={classes === 'submit' ? submitClass : cancelClass} onClick={ classes === 'submit' ? handleSubmit : () => router.back() } startIcon={startIcon} endIcon={endIcon} size={size} variant='contained' type='submit'>{buttonText}</Button>
	)
}