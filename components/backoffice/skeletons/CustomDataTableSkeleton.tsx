'use client';

import * as React from 'react';
import { Masonry } from '@mui/lab';
import { Skeleton, Paper } from '@mui/material';

export default function CustomDataTableSkeleton({ setIsLoading, data }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 4000);

	return (
		<Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 5 }} spacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}>
			{
				data.map((item: any, index: number) => (
					<Skeleton key={index} className={`!bg-white !h-[35vh]`} variant="rectangular" />
				))
			}
		</Masonry>
	)
}
