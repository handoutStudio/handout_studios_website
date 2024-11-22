import { Grid2 as Grid, Paper } from '@mui/material';
import * as React from 'react';
import WeeklySalesChart from './WeeklySalesChart';
import BestSellingProductChart from './BestSellingProductChart';

export default function DashboardCharts() {

	return (
		<Grid container spacing={2} columns={12} sx={{ width: '100% !important' }}>
			<Grid size={{ xs: 12, lg: 6 }}>
				<Paper className={`p-2 bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl`} elevation={2}>
					<WeeklySalesChart />
				</Paper>
			</Grid>
			<Grid size={{ xs: 12, lg: 6 }}>
				<Paper className={`p-2 bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl`} elevation={2}>
					<BestSellingProductChart />
				</Paper>
			</Grid>
		</Grid>
	)
}