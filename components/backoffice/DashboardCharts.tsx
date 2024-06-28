import { Grid, Paper } from '@mui/material';
import * as React from 'react';
import WeeklySalesChart from './WeeklySalesChart';
import BestSellingProductChart from './BestSellingProductChart';

export default function DashboardCharts() {

	return (
		<Grid container spacing={3} columns={12}>
			<Grid item xs={12} md={7}>
				<Paper className={`p-2 bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl`} elevation={2}>
					<WeeklySalesChart />
				</Paper>
			</Grid>
			<Grid item xs={12} md={5}>
				<Paper className={`p-2 bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl`} elevation={2}>
					<BestSellingProductChart />
				</Paper>
			</Grid>
		</Grid>
	)
}
