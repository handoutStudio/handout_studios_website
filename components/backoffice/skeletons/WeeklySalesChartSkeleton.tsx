import * as React from 'react';
import { Skeleton } from '@mui/material';

export default function WeeklySalesChartSkeleton({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<div className={`bg-transperent p-2 rounded-lg`}>
			<Skeleton className={`!bg-white`} variant="text" width={400} height={80} />
			<div className={`flex flex-row gap-2 w-full`}>
				<Skeleton className={`!bg-white`} variant="text" width={200} height={100} />
				<Skeleton className={`!bg-white`} variant="text" width={200} height={100} />
			</div>
			<Skeleton className={`!bg-white w-full`} variant="rounded" width={830} height={340} />
		</div>
	)
}
