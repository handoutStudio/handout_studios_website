'use client';

import * as React from 'react';
import { InfoRounded } from '@mui/icons-material'; 
import logo from '@/public/Assets/logo/compressed/logo 6.svg';
import { useWindowDimensions } from '@/components/backoffice/Sidebar';
import logoStamp from '@/public/Assets/logo/compressed/final stamp 1.svg';
import CustomDataTableSkeleton from './skeletons/CustomDataTableSkeleton';
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';

export default function CustomerDataTable() {

	const [getCols, setCols] = React.useState(0);
	const [getGaps, setGaps] = React.useState(0);
	const { width, height } = useWindowDimensions();
	const [getIsLoading, setIsLoading] = React.useState(true);

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
		{
			name: "Driscoll Rodriquez",
			totalSpends: '794',
			photo: logo.src,
		},
		{
			name: "Sybil Nelson",
			totalSpends: '1361',
			photo: logoStamp.src,
		},
		{
			name: "Katell Gates",
			totalSpends: '4111',
			photo: logo.src,
		},
		{
			name: "Kermit Pate",
			totalSpends: '4776',
			photo: logoStamp.src,
		},
		{
			name: "Charity Young",
			totalSpends: '4645',
			photo: logo.src,
		},
		{
			name: "Winifred Sexton",
			totalSpends: '1705',
			photo: logoStamp.src,
		},
		{
			name: "Hop Riddle",
			totalSpends: '2750',
			photo: logo.src,
		},
		{
			name: "Basia Sweeney",
			totalSpends: '1051',
			photo: logoStamp.src,
		},
		{
			name: "Karina Frank",
			totalSpends: '4997',
			photo: logo.src,
		},
		{
			name: "Lynn William",
			totalSpends: '1155',
			photo: logoStamp.src,
		},
		{
			name: "Seth Bullock",
			totalSpends: '3424',
			photo: logo.src,
		},
		{
			name: "Abdul Sharpe",
			totalSpends: '2229',
			photo: logoStamp.src,
		},
		{
			name: "Keegan Webb",
			totalSpends: '524',
			photo: logo.src,
		},
		{
			name: "Irene Henry",
			totalSpends: '892',
			photo: logoStamp.src,
		},
		{
			name: "Kennan Battle",
			totalSpends: '2443',
			photo: logo.src,
		},
		{
			name: "Camden Bryant",
			totalSpends: '4369',
			photo: logoStamp.src,
		},
		{
			name: "Gareth Cunningham",
			totalSpends: '1931',
			photo: logo.src,
		},
		{
			name: "Kathleen O'brien",
			totalSpends: '4371',
			photo: logoStamp.src,
		},
		{
			name: "Fitzgerald James",
			totalSpends: '3659',
			photo: logo.src,
		},
		{
			name: "Rigel Medina",
			totalSpends: '3975',
			photo: logoStamp.src,
		},
		{
			name: "Stephanie Blankenship",
			totalSpends: '1815',
			photo: logo.src,
		},
		{
			name: "Yolanda Moody",
			totalSpends: '2155',
			photo: logoStamp.src,
		},
		{
			name: "Keiko Little",
			totalSpends: '3591',
			photo: logo.src,
		},
		{
			name: "Sopoline Young",
			totalSpends: '3809',
			photo: logoStamp.src,
		},
		{
			name: "Mason Tanner",
			totalSpends: '2545',
			photo: logo.src,
		},
	];

	return (
		<div className={`flex flex-col w-full mt-10 justify-center bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl p-4 mb-5`}>
			{
				getIsLoading
				?
					(<CustomDataTableSkeleton setIsLoading={setIsLoading} />)
				:
					(
						<ImageList variant="masonry" className='w-50 h-50' cols={getCols} gap={getGaps}>
							{
								data.map((item: any, index: number) => (
									<ImageListItem key={index}>
										<img srcSet={`${item.photo !== '' ? item.photo : logo.src}?w=248&fit=crop&auto=format&dpr=2 2x`} src={`${item.photo !== '' ? item.photo : logo.src}?w=248&fit=crop&auto=format`} alt={item.name} loading="eager" />
										{ width !== undefined && width < 600 ? null : <ImageListItemBar title={<span className={`${width !== undefined && width < 600 ? '' : '!text-sm'}`}>{ item.name }</span>} subtitle={<span className={`${width !== undefined && width < 600 ? '' : '!text-xs'}`}>{ 'orders : '+ item.totalSpends }</span>} actionIcon={ <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.title}`} > <InfoRounded /> </IconButton> } /> }
									</ImageListItem>
								))
							}
						</ImageList>
					)
				}
			</div>
	)
}
