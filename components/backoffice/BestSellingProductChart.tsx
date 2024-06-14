'use client';

import React from 'react'
import { PieChart } from '@mui/x-charts';
import { Typography } from '@mui/material';

export default function BestSellingProductChart() {
	
	const data = [
		{ id: 0, value: 10, label: 'Product A' },
		{ id: 1, value: 15, label: 'Product B' },
		{ id: 2, value: 20, label: 'Product C' },
		{ id: 3, value: 10, label: 'Product D' },
		{ id: 4, value: 15, label: 'Product E' },
		{ id: 5, value: 20, label: 'Product F' },
		{ id: 6, value: 10, label: 'Product G' },
		{ id: 7, value: 15, label: 'Product H' },
		{ id: 8, value: 20, label: 'Product I' },
		{ id: 9, value: 10, label: 'Product J' },
		{ id: 10, value: 15, label: 'Product K' },
		{ id: 11, value: 20, label: 'Product L' },
	];
	
	const colors = ['#ea580c', '#16a34a', '#0284c7', '#4f46e5', '#db2777', '#0891b2', '#c026d3', '#7c3aed', '#e11d48', '#059669', '#9333ea', '#0d9488'];
	
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
							paddingAngle: 2, 
							cornerRadius: 5, 
							startAngle: 0, 
							endAngle: 360, 
							highlightScope: { faded: 'global', highlighted: 'item' },
							faded: { innerRadius: 30, additionalRadius: -30, color: '#2d333a' }
						}
					]}
					slotProps={{ legend: { position: { horizontal: 'middle', vertical: 'top' }, direction: 'row' } }}
					height={470}
					sx={{ '@media screen and (max-width: 500px)': { width: `100% !important`, height: '300px !important' }, '@media screen and (min-width: 501px) and (max-width: 800px)': { width: `100% !important`, height: '400px !important' } }}
				/>
			</div>
		</div>
	)
}
