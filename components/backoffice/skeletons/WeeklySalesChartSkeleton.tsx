import * as React from 'react';
import { Skeleton } from '@mui/material';

export default function WeeklySalesChartSkeleton({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<div className={`bg-transperent p-2 rounded-lg`}>
			<Skeleton className={`!bg-white !h-[10vh] !w-[50%]`} variant="text" />
			<div className={`flex flex-row gap-2`}>
				<Skeleton className={`!bg-white !w-[15%] !h-[8vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[15%] !h-[8vh]`} variant="text" />
			</div>
			<Skeleton className={`!bg-white !h-[40vh]`} variant="rounded" />
		</div>
	)
}
