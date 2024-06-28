import * as React from 'react';
import { Avatar, Badge, Typography } from '@mui/material';
import { LightMode, Notifications, Menu } from '@mui/icons-material';

export default function Footer() {
	return (
		<div className={`flex max-[600px]:items-start max-[600px]:justify-start max-[399px]:pl-5 min-[400px]:pl-20 items-center justify-center text-[#7c0104] dark:text-white h-8 bottom-0 w-full pl-64 z-10 mb-5`}>
            <Typography className={`text-sm max-[399px]:text-xs`} variant={'caption'} component={'div'}> Copyright &copy; 2024 handout Studios. All Rights Reserved.</Typography>
		</div>
	)
}
