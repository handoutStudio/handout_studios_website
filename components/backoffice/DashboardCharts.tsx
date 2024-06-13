import { Grid, Paper } from '@mui/material';
import * as React from 'react';
import WeeklySalesChart from './WeeklySalesChart';
import BestSellingProductChart from './BestSellingProductChart';

export default function DashboardCharts() {

	return (
		<Grid container spacing={3} columns={12}>
			<Grid item xs={12} md={6}>
				<Paper className={`p-2 bg-red-700`} elevation={2}>
					<WeeklySalesChart />
				</Paper>
			</Grid>
			<Grid item xs={12} md={6}>
				<Paper className={`p-2 bg-red-700`} elevation={2}>
					<BestSellingProductChart />
				</Paper>
			</Grid>
		</Grid>
	)
}
