'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import useScreenSize from '@/app/lib/useScreenSize';

export function Buttons({classes, handleSubmit, startIcon, endIcon, buttonText}: any) {

	const router = useRouter();
	const screenSize = useScreenSize();
	const submitClass = 'bg-red-700 w-40 max-[570px]:w-full dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-500 flex justify-around';
	const cancelClass = 'bg-gray-50 w-40 max-[570px]:w-full hover:bg-gray-50 text-red-700 dark:text-red-500 flex justify-around';

	return (
		<>
			{
				screenSize?.width && screenSize.width >= 571
				?
					<Button className={classes === 'submit' ? submitClass : cancelClass} onClick={ classes === 'submit' ? handleSubmit : () => router.back() } startIcon={startIcon} endIcon={endIcon} size={'large'} variant='contained' type='submit'>{buttonText}</Button>
				:
					<Button className={classes === 'submit' ? submitClass : cancelClass} onClick={ classes === 'submit' ? handleSubmit : () => router.back() } startIcon={startIcon} endIcon={endIcon} size={'medium'} variant='contained' type='submit'>{buttonText}</Button>
			}
		</>
	)
}