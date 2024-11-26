'use client';

import * as React from 'react';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography, Paper } from '@mui/material';

export default function CustomerDataTable() {

	return (
		<div className={`flex flex-col mt-10 justify-center bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl p-4 mb-5`}>
			<Paper sx={{ width: '100%', overflow: 'hidden' }} className={`rounded-2xl`}>
				<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
						</ListItemAvatar>
						<ListItemText primary="Brunch this weekend?" secondary={<Typography component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' }} > Ali Connors </Typography> } />
					</ListItem>
					<Divider variant="inset" component="li" />
				</List>
			</Paper>
		</div>
	)
}
