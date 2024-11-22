'use client';

import * as React from 'react';
import ThemeSwitcher from '../ThemeSwitcher';
import logo from '@/public/Assets/logo/compressed/final stamp 1.svg';
import { Notifications, Settings, Logout, TrendingDown, TrendingUp, Close } from '@mui/icons-material';
import { Avatar, Badge, Divider, MenuItem, ListItemIcon, IconButton, Tooltip, Menu, Typography, ListItemText, Chip, Zoom, Link } from '@mui/material';

export default function Navbar() {

	const [anchorElAvatar, setAnchorElAvatar] = React.useState<null | HTMLElement>(null);
	const [anchorElNotifications, setAnchorElNotifications] = React.useState<null | HTMLElement>(null);

	const openAvatar = Boolean(anchorElAvatar);
	const handleCloseAvatar = () => setAnchorElAvatar(null);
	const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => setAnchorElAvatar(event.currentTarget);

	const openNotification = Boolean(anchorElNotifications);
	const handleCloseNotification = () => setAnchorElNotifications(null);
	const handleClickNotification = (event: React.MouseEvent<HTMLElement>) => setAnchorElNotifications(event.currentTarget);
	const handleRemoveNotification = (index: number) => console.log(`Remove Item From Index: ${index}...!`);

	const today = new Date();
	const yyyy = today.getFullYear();
	let mm: string = (today.getMonth() + 1).toString(); // Months start at 0!
	let dd: string = today.getDate().toString();

	let hours: string = today.getHours().toString();
	let minutes: string = today.getMinutes().toString();

	if (Number(dd) < 10) dd = '0' + dd;
	if (Number(mm) < 10) mm = '0' + mm;

	if (Number(hours) < 10) hours = '0' + hours;
	if (Number(minutes) < 10) minutes = '0' + minutes;
	minutes = Number(hours) >= 12 ? minutes + ' PM' : minutes + ' AM';

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	const formattedTime = hours + ":" + minutes;

	const notificationData = [
		{
			icon: <TrendingUp fontSize={"medium"} />,
			event: 'New Order',
			eventColor: 'bg-green-700 text-white',
			primaryText: 'Something Something Something Something Something Something Something Something Something Something Something Something',
			secondaryText: formattedToday,
			secondaryTextTime: formattedTime,
		},
		{
			icon: <TrendingDown fontSize={"medium"} />,
			event: 'Order Cancelled',
			eventColor: 'bg-red-700 text-white',
			primaryText: 'Something',
			secondaryText: formattedToday,
			secondaryTextTime: formattedTime,
		},
		{
			icon: <TrendingUp fontSize={"medium"} />,
			event: 'New Order',
			eventColor: 'bg-green-700 text-white',
			primaryText: 'Something Something Something Something Something Something Something Something Something Something Something Something',
			secondaryText: formattedToday,
			secondaryTextTime: formattedTime,
		},
		{
			icon: <TrendingDown fontSize={"medium"} />,
			event: 'Order Cancelled',
			eventColor: 'bg-red-700 text-white',
			primaryText: 'Something',
			secondaryText: formattedToday,
			secondaryTextTime: formattedTime,
		},
		{
			icon: <TrendingUp fontSize={"medium"} />,
			event: 'New Order',
			eventColor: 'bg-green-700 text-white',
			primaryText: 'Something Something Something Something Something Something Something Something Something Something Something Something',
			secondaryText: formattedToday,
			secondaryTextTime: formattedTime,
		},
		{
			icon: <TrendingDown fontSize={"medium"} />,
			event: 'Order Cancelled',
			eventColor: 'bg-red-700 text-white',
			primaryText: 'Something',
			secondaryText: formattedToday,
			secondaryTextTime: formattedTime,
		},
	]

  	return (
		<div className={`flex items-center justify-between bg-[#7c0104] dark:bg-[#2D333A] text-white h-20 px-8 py-4 fixed top-0 w-full z-10 pr-[1vw] border-dotted border-white border-b-[1px]`}>
			
			{/* Icon */}
			<button>
				<div className={`flex w-full`}>
					<Link href={'/dashboard'} className={`flex flex-row justify-center gap-2 items-center no-underline`}>
						<Avatar src={logo.src} alt="Remy Sharp" className={`bg-white rounded-full p-2 w-10 h-10`} />
						{' '}
						<Typography className={`text-white min-[600px]:text-2xl text-sm`} variant={'h5'} component={'h5'}>Handout Studios</Typography>
					</Link>
				</div>
			</button>
			
			{/* 3 Icons */}
			<div className={`flex space-x-6`}>
				
				<ThemeSwitcher />
				
				<Tooltip title="Notifications" TransitionComponent={Zoom} followCursor>
					<IconButton onClick={handleClickNotification} size="small" sx={{ ml: 2 }} aria-controls={openNotification ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={openNotification ? 'true' : undefined}>
						<Badge color='error' badgeContent={notificationData.length} max={99} overlap="rectangular">
							<Notifications fontSize='large' className={`max-[600px]:text-xl text-white`} />
						</Badge>
					</IconButton>
				</Tooltip>
				<Menu anchorEl={anchorElNotifications} id="account-menu" open={openNotification} onClose={handleCloseNotification} onClick={handleCloseNotification} PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 }, '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0 } }}} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
					{
						notificationData.map((items: any, index: number) => 
							<MenuItem onClick={handleCloseNotification} key={index} className={`flex items-center gap-2 hover:text-balance`}>
								<ListItemIcon>
									<Avatar className={`flex justify-center items-center ${ items.eventColor }`}>
										{ items.icon }
									</Avatar>
								</ListItemIcon>
								<ListItemText className={` w-80 truncate hover:text-balance`} primary={ items.primaryText } secondary={
									<div className='flex gap-2 items-center'>
										<Chip label={ items.event } size="small" className={ items.eventColor } />
										&rarr;
										<div className={`flex gap-2 justify-start w-full`}>
											<Typography variant={`caption`} component={'div'}>{ items.secondaryText }</Typography>
											&#x2022;
											<Typography variant={`caption`} component={'div'}>{ items.secondaryTextTime }</Typography>
										</div>
									</div>
								} />
								<ListItemIcon onClick={ () => handleRemoveNotification(index) }>
									<Close fontSize='small' />
								</ListItemIcon>
							</MenuItem>
						)
					}
				</Menu>
				
				<Tooltip title="Account settings"  TransitionComponent={Zoom} followCursor>
					<IconButton onClick={handleClickAvatar} size="small" sx={{ ml: 2 }} aria-controls={openAvatar ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={openAvatar ? 'true' : undefined}>
						<Avatar alt="Remy Sharp" src={`https://mui.com/static/images/avatar/3.jpg`} className={`max-[600px]:w-7 max-[600px]:h-7 w-10 h-10`} />
					</IconButton>
				</Tooltip>
				<Menu anchorEl={anchorElAvatar} id="account-menu" open={openAvatar} onClose={handleCloseAvatar} onClick={handleCloseAvatar} PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 }, '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0 } }}} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
					<MenuItem onClick={handleCloseAvatar}>
						<Avatar alt="Remy Sharp" src={`https://mui.com/static/images/avatar/3.jpg`} /> My account
					</MenuItem>
					<Divider />
					<MenuItem onClick={handleCloseAvatar}>
						<ListItemIcon>
							<Settings fontSize={"medium"} className={`text-[#7c0104]`} />
						</ListItemIcon>
						Profile Settings
					</MenuItem>
					<MenuItem onClick={handleCloseAvatar}>
						<ListItemIcon>
							<Logout fontSize={"medium"} className={`text-[#7c0104]`} />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			
			</div>
			
		</div>
	)
}
