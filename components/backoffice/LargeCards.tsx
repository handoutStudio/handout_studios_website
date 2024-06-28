import * as React from 'react';
import LargeCard from './LargeCard';
import { Grid } from '@mui/material';
import { CurrencyRupee, ShoppingCart } from '@mui/icons-material';

export default function LargeCards() {

	const orderStats = [
		{
			period: `Today's Orders`,
			sales: 110000,
			icon: <ShoppingCart fontSize='large' />
		},
		{
			period: `Yesterday's Orders`,
			sales: 130000,
			icon: <ShoppingCart fontSize='large' />
		},
		{
			period: `This Month`,
			sales: 300000,
			icon: <CurrencyRupee fontSize='large' />
		},
		{
			period: `Last Month`,
			sales: 350000,
			icon: <CurrencyRupee fontSize='large' />
		},
		{
			period: `All - Time Sales`,
			sales: 110000,
			icon: <CurrencyRupee fontSize='large' />
		},
	];

	return (
		<div className={`flex py-8`}>
			{/* TODO: Large Card Component */}
			<Grid container gap={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={12}>
				{
					orderStats.map((stats: any, index: number) =>
						<Grid xs={12} sm={6} md={4} lg={3} xl={2} key={ index }>
							<LargeCard className={ stats.color } data={ stats } />
						</Grid>
					)
				}
			</Grid>
		</div>
	)
}
