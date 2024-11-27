'use client';

import * as React from 'react';
import { useWindowDimensions } from '@/components/backoffice/Sidebar';
import { ImageList, ImageListItem, ImageListItemBar, Skeleton } from '@mui/material';

export default function CustomDataTableSkeleton({ setIsLoading }: any) {

	setTimeout(() => {
		setIsLoading(false);
	}, 4000);

	const [getCols, setCols] = React.useState(0);
	const [getGaps, setGaps] = React.useState(0);
	const { width, height } = useWindowDimensions();

	React.useEffect(() => {
		width !== undefined
		?
			width > 950
				?
					(setCols(5), setGaps(8))
				:
					width > 600 && width <= 950
					?
						(setCols(3), setGaps(4))
					:
						width > 375 && width <= 600
						?
							(setCols(2), setGaps(3))
						:
							(setCols(1), setGaps(2))
		:
			null

	}, [width]);

	const data = [
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
		{ name: "" },
	];

	return (
		<ImageList variant="masonry" className='w-50 h-50' cols={getCols} gap={getGaps}>
			{
				data.map((item: any, index: number) => (
					<ImageListItem key={index}>
						<Skeleton variant="rectangular" className={`!bg-white w-[17.5vw] h-[10vw]`} />
						{ width !== undefined && width < 600 ? null : <ImageListItemBar title={<Skeleton variant='text' className={`!bg-white w-[10vw] h-10`} />} subtitle={<Skeleton variant='text' className={`!bg-white w-[5vw] h-5`} />} actionIcon={ <Skeleton variant='circular' className={`!bg-white h-10 w-10 mr-5`} /> } /> }
					</ImageListItem>
				))
			}
		</ImageList>
	)
}
