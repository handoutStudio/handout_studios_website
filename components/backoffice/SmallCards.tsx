import * as React from 'react';
import SmallCard from './SmallCard';
import Grid from '@mui/material/Grid2';
import { Autorenew, Check, LocalShipping, ShoppingCart } from '@mui/icons-material';

export default function SmallCards() {

	const orderStats = [
		{
			title: `Total Orders`,
			sales: 500,
			IconcolorName: `text-green-600`,
			icon: <ShoppingCart fontSize='medium' />
		},
		{
			title: `Orders Pending`,
			sales: 100,
			IconcolorName: `text-orange-600`,
			icon: <Autorenew fontSize='medium' />
		},
		{
			title: `Order Processing`,
			sales: 200,
			IconcolorName: `text-blue-600`,
			icon: <LocalShipping fontSize='medium' />
		},
		{
			title: `Orders Delivered`,
			sales: 3500,
			IconcolorName: `text-cyan-600`,
			icon: <Check fontSize='medium' />
		}
	];

	return (
		<div className={`flex py-4`}>
			{/* TODO: Large Card Component */}
			<Grid container spacing={2} columns={12} sx={{ width: '100% !important' }}>
				{
					orderStats.map((stats: any, index: number) =>
						<Grid size={{ xs: 12, sm:5, lg: 3 }} key={ index }>
							<SmallCard className={ stats.color } data={ stats } />
						</Grid>
					)
				}
			</Grid>
		</div>
	)
}
