import * as React from 'react';
import LargeCard from './LargeCard';
import Grid from '@mui/material/Grid2';
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
			<Grid container spacing={2} columns={12} sx={{ width: '100% !important' }}>
				{
					orderStats.map((stats: any, index: number) =>
						<Grid size={{ xs: 12, sm:5, lg: 2.3 }} key={ index }>
							<LargeCard className={ stats.color } data={ stats } />
						</Grid>
					)
				}
			</Grid>
		</div>
	)
}
