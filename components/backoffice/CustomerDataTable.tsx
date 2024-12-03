'use client';

import * as React from 'react';
import Image from 'next/image';
import { InfoRounded } from '@mui/icons-material'; 
import logo from '@/public/Assets/logo/compressed/logo 6.svg';
import { useWindowDimensions } from '@/components/backoffice/Sidebar';
import logoStamp from '@/public/Assets/logo/compressed/final stamp 1.svg';
import CustomDataTableSkeleton from './skeletons/CustomDataTableSkeleton';
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';

export default function CustomerDataTable() {

	const [getCols, setCols] = React.useState(0);
	const [getWidth, setWidth] = React.useState(0);
	const [getHeight, setHeight] = React.useState(0);
	const { width, height } = useWindowDimensions();
	const [getIsLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		width !== undefined && height !== undefined
		?
			width > 1200
			?
				(setCols(5), setWidth(width / 5), setHeight(height / 3))
			:
				width > 1000 && width <= 1200
				?
					(setCols(4), setWidth(width / 5), setHeight(height / 3))
				:
					width > 750 && width <= 1000
					?
						(setCols(3), setWidth(width / 3), setHeight(height / 2))
					:
						width > 500 && width <= 750 
						?
							(setCols(2), setWidth(width / 2), setHeight(height / 1.5))
						:
							width > 375 && width <= 500
							?
								(setCols(1), setWidth(width / 1.5))
							:
								(setCols(1), setWidth(width), setHeight(height))
		:
			null

	}, [width, height]);

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
			name: "Keiko Little",
			totalSpends: '3591',
			photo: logo.src,
		},
	];

	return (
		<div className={`flex flex-col w-full mt-10 justify-center bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl p-4 mb-5`}>
			{
				getIsLoading
				?
					(<CustomDataTableSkeleton setIsLoading={setIsLoading} data={data} />)
				:
					(
						<ImageList variant="masonry" className='w-50 h-50' cols={getCols} gap={18}>
							{
								data.map((item: any, index: number) => (
									<ImageListItem key={index} className={`!bg-white rounded-lg`}>
										<Image className={`rounded-lg flex flex-col justify-center items-center p-5`} src={`${item.photo !== '' ? item.photo : logo.src}`} alt={item.name} loading='eager' width={getWidth} height={getHeight} />
										<ImageListItemBar className={`rounded-b-lg`} title={<span className={`!text-sm`}>{ item.name }</span>} subtitle={<span className={`!text-xs`}>{ 'orders : '+ item.totalSpends }</span>} actionIcon={ <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.title}`} > <InfoRounded /> </IconButton> } />
									</ImageListItem>
								))
							}
						</ImageList>
					)
				}
			</div>
	)
}
