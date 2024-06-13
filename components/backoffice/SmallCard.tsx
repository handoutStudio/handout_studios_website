import * as React from 'react';
import { Avatar, Paper, Typography } from '@mui/material';

export default function SmallCard({ data }: any) {
	return (
		<Paper className={`${data.bgColor} text-white rounded-lg flex items-center p-4`} elevation={2}>
			<div className={`flex flex-1 space-x-4`}>
				<Avatar alt="Remy Sharp" className={`${data.bgIconColor} ${data.textIconColor} w-12 h-12`}>
					{data.icon}
				</Avatar>
				<div className={`flex flex-col`}>
					<Typography variant={'subtitle2'} component={'div'}>{ data.title }</Typography>
					<Typography variant={'h4'} component={'h4'}>{ data.sales }</Typography>
				</div>
			</div>
		</Paper>
	)
}
