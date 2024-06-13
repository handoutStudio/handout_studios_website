'use client';

import React from 'react'
import { PieChart } from '@mui/x-charts';
import { Typography } from '@mui/material';

export default function BestSellingProductChart() {

	const data = [{ id: 0, value: 10, label: 'series A' }, { id: 1, value: 15, label: 'series B' }, { id: 2, value: 20, label: 'series C' }];
	const colors = ['#ea580c', '#16a34a', '#0284c7'];
	// const colors = ['#dc2626', '#ea580c', '#16a34a', '#059669', '#0d9488', '#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48'];

	return (
		<div className={`bg-white p-2 rounded-lg`}>
			<Typography variant={'h5'} component={'h5'}>BestSellingProductChart</Typography>
			<div className={`w-full h-full`}>
				<PieChart
					colors={ colors }
					series={[
						{
							data,
							innerRadius: 30, 
							outerRadius: 150, 
							paddingAngle: 5, 
							cornerRadius: 5, 
							startAngle: 0, 
							endAngle: 360, 
							highlightScope: { faded: 'global', highlighted: 'item' },
							faded: { innerRadius: 30, additionalRadius: -30, color: '#2d333a' } 
						}
					]}
					slotProps={{ legend: { hidden: true } }}
					height={470}
				/>
			</div>
		</div>
	)
}
