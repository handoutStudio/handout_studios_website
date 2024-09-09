'use client';

import * as React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import useScreenSize from '@/app/lib/useScreenSize';

export function Buttons({classes, handleSubmit, startIcon, endIcon, buttonText}: any) {

	const router = useRouter();
	const screenSize = useScreenSize();
	const submitClass = 'bg-red-700 w-40 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-500 flex justify-around max-[570px]:w-30 max-[570px]:text-sm';
	const cancelClass = 'bg-gray-50 w-40 hover:bg-gray-50 text-red-700 dark:text-red-500 flex justify-around max-[570px]:w-30 max-[570px]:text-sm';

	return (
		<>
			{
				screenSize?.width && screenSize.width >= 571
				?
					<Button className={classes === 'submit' ? submitClass : cancelClass} onClick={ classes === 'submit' ? handleSubmit : () => router.back() } startIcon={startIcon} endIcon={endIcon} size={'large'} variant='contained' type='submit'>{buttonText}</Button>
				:
					screenSize?.width && screenSize?.width <= 570 && screenSize?.width >= 500
					?
						<Button className={classes === 'submit' ? submitClass : cancelClass} onClick={ classes === 'submit' ? handleSubmit : () => router.back() } startIcon={startIcon} endIcon={endIcon} size={'medium'} variant='contained' type='submit'>{buttonText}</Button>
					:
						<Button className={classes === 'submit' ? submitClass : cancelClass} onClick={ classes === 'submit' ? handleSubmit : () => router.back() } startIcon={startIcon} endIcon={endIcon} size={'small'} variant='contained' type='submit'>{buttonText}</Button>

			}
		</>
	)
}