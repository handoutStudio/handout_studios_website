import * as React from 'react';
import SmallCard from './SmallCard';
import { Grid } from '@mui/material';
import { Autorenew, Check, LocalShipping, ShoppingCart } from '@mui/icons-material';

export default function SmallCards() {

	const orderStats = [
		{
			title: `Total Orders`,
			sales: 500,
			bgColor: 'bg-green-600',
			bgIconColor: `bg-white`,
			textIconColor: 'text-green-600',
			icon: <ShoppingCart fontSize='medium' />
		},
		{
			title: `Orders Pending`,
			sales: 100,
			bgColor: 'bg-orange-600',
			bgIconColor: `bg-white`,
			textIconColor: 'text-orange-600',
			icon: <Autorenew fontSize='medium' />
		},
		{
			title: `Order Processing`,
			sales: 200,
			bgColor: 'bg-blue-600',
			bgIconColor: `bg-white`,
			textIconColor: 'text-blue-600',
			icon: <LocalShipping fontSize='medium' />
		},
		{
			title: `Orders Delivered`,
			sales: 3500,
			bgColor: 'bg-cyan-600',
			bgIconColor: `bg-white`,
			textIconColor: 'text-cyan-600',
			icon: <Check fontSize='medium' />
		}
	];

	return (
		<div className={`flex py-4`}>
			{/* TODO: Large Card Component */}
			<Grid container gap={{ xs: 2, sm: 3 }} columns={9}>
				{
					orderStats.map((stats: any, index: number) =>
						<Grid item xs={12} sm={6} md={4} lg={2} key={ index }>
							<SmallCard className={ stats.color } data={ stats } />
						</Grid>
					)
				}
			</Grid>
		</div>
	)
}
