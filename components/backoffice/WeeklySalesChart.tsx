'use client';

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { CurrencyRupee, ShoppingBag } from '@mui/icons-material';


export default function WeeklySalesChart() {

	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const colors = ['#7c0104', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#16a34a', '#059669', '#0d9488', '#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48'];

	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue);

	return (
		<div className={`bg-white p-2 rounded-lg`}>			
			<Typography className={`text-[#7c0104] p-2  underline underline-offset-4`} variant={'h5'} component={'h5'}>Weekly Sales</Typography>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="Weekly Sales">
						<Tab sx={{ color: '#7c0104' }} icon={<CurrencyRupee />} iconPosition='start' label="Sales" value="1" />
						<Tab sx={{ color: '#7c0104' }} icon={<ShoppingBag />} iconPosition='start' label="Orders" value="2" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<LineChart
						colors={colors}
						xAxis={[{ data }]}
						series={[
							{
								data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
								showMark: ({ index }) => index % 2 === 0,
							},
						]}
						height={350}
					/>
				</TabPanel>
				<TabPanel value="2">
					<LineChart
						colors={colors}
						xAxis={[{ data }]}
						series={[
							{
								data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
								showMark: ({ index }) => index % 2 === 0,
							},
						]}
						height={350}
					/>
				</TabPanel>
			</TabContext>
		</div>
	)
}