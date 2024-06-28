import * as React from 'react';
import { Avatar, Paper, Typography } from '@mui/material';

export default function LargeCard({ data }: any) {
	return (
		<Paper className={`dark:bg-[#AF0106] bg-[#7C0107] text-white rounded-lg p-8 flex flex-col gap-2 items-center justify-center`} elevation={2}>
			<Avatar alt="Remy Sharp" className={`bg-transparent text-white w-15 h-15`}>
				{data.icon}
			</Avatar>
			<Typography variant={`subtitle1`} component={'h4'}>{ data.period }</Typography>
			<h2 className={`text-3xl`}>{ "UGX. " + data.sales }</h2>
		</Paper>
	)
}
