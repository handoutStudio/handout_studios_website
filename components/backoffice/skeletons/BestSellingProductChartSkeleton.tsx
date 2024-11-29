import * as React from 'react';
import { Skeleton } from '@mui/material';

export default function BestSellingProductChartSkeleton({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<div className={`bg-transperent p-2 rounded-lg gap-2 flex flex-col`}>
			<Skeleton className={`!bg-white !h-[10vh] !w-[50%]`} variant="text" />
			<div className={`flex flex-row gap-2 w-full max-[600px]:hidden max-[600px]:invisible`}>
				<Skeleton className={`!bg-white !w-[6vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[6vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[6vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[6vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[6vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[6vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[6vw] !h-[5vh]`} variant="text" />
			</div>
			<div className={`flex flex-row gap-2 w-full max-[600px]:hidden max-[600px]:invisible`}>
				<Skeleton className={`!bg-white !w-[5.8vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[5.8vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[5.8vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[5.8vw] !h-[5vh]`} variant="text" />
				<Skeleton className={`!bg-white !w-[5.8vw] !h-[5vh]`} variant="text" />
			</div>
			<Skeleton className={`!bg-white w-full !h-[35vh]`} variant="rounded" />
		</div>
	)
}
