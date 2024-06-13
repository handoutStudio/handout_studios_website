import * as React from 'react';
import { Avatar, Badge, Typography } from '@mui/material';
import { LightMode, Notifications, Menu } from '@mui/icons-material';

export default function Footer() {
	return (
		<div className={`flex items-center justify-center bg-white text-red-800 h-8 bottom-0 w-full pl-64 z-10 mb-5`}>
            <Typography className={`text-sm`} variant={'caption'} component={'div'}> Copyright &copy; 2024 handout Studios. All Rights Reserved.</Typography>
		</div>
	)
}
