import * as React from 'react';
import { Skeleton, Paper } from '@mui/material';

export default function LargeCardSkeleton({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<Paper className={`dark:bg-[#AF0106] bg-[#7C0107] text-white rounded-lg p-8 flex flex-col gap-2 items-center justify-center`} elevation={2}>
			<Skeleton className={`bg-white`} variant="circular" width={60} height={60} />
			<Skeleton className={`bg-white`} variant="text" width={100} height={20} />
			<Skeleton className={`bg-white`} variant="text" width={100} height={20} />
		</Paper>
	)
}
