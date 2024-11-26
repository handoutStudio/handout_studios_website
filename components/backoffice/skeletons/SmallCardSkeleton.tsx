import * as React from 'react';
import { Skeleton, Paper } from '@mui/material';

export default function SmallCardSkeleton({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<Paper className={`bg-[#7C0107] dark:bg-[#AF0106] text-white rounded-lg flex items-center p-4`} elevation={2}>
			<div className={`flex flex-1 space-x-4`}>
				<Skeleton variant="circular" className={`bg-white`} width={60} height={60} />
				<div className={`flex flex-col`}>
					<Skeleton variant="text" className={`bg-white`} width={100} height={20} />
					<Skeleton variant="text" className={`bg-white`} width={100} height={20} />
				</div>
			</div>
		</Paper>
	)
}
