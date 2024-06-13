'use client';

import Link from 'next/link';
import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { usePathname } from 'next/navigation';
import { List, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, CSSObject, ListSubheader } from '@mui/material';
import { ChevronLeft, ChevronRight, Diversity1, Groups3, ReduceCapacity, Settings, ShoppingBasket, SpaceDashboard, Store, Storefront, Style,  } from '@mui/icons-material';


const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({ width: drawerWidth, transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }), overflowX: 'hidden' });
const closedMixin = (theme: Theme): CSSObject => ({ transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }), overflowX: 'hidden', width: `calc(${theme.spacing(7)} + 1px)`, [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` }});
// necessary for content to be below app bar
const DrawerHeader = styled('div')(({ theme }) => ({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: theme.spacing(0, 1), ...theme.mixins.toolbar }));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({ width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }), ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) })}));


export default function Sidebar() {

	const pathName = usePathname();

	const [open, setOpen] = React.useState(false);
  	const handleDrawerClose = () => setOpen(!open);

	const paths = [
		{
			Stats_More: [
				{
					name: 'Dashboard',
					path: '/dashboard',
					icon: <SpaceDashboard className={`${pathName === '/dashboard' ? 'text-red-600' : 'text-white'}`} />,
				},
				{
					name: 'Catalogue',
					path: '/dashboard/catalogue',
					icon: <Style className={`${pathName === '/dashboard/catalogue' ? 'text-red-600' : 'text-white'}`} />,
				},
				{
					name: 'Markets',
					path: '/dashboard/markets',
					icon: <Store className={`${pathName === '/dashboard/markets' ? 'text-red-600' : 'text-white'}`} />,
				},
				{
					name: 'Farmers',
					path: '/dashboard/farmers',
					icon: <Groups3 className={`${pathName === '/dashboard/farmers' ? 'text-red-600' : 'text-white'}`} />,
				},
				{
					name: 'Online Store',
					path: '/dashboard/online-store',
					icon: <Storefront className={`${pathName === '/dashboard/online-store' ? 'text-red-600' : 'text-white'}`} />,
				},
			],
		},
		{
			Customers_Orders: [
				{
					name: 'Customers',
					path: '/dashboard/customers',
					icon: <Diversity1 className={`${pathName === '/dashboard/customers' ? 'text-red-600' : 'text-white'}`} />,
				},
				{
					name: 'Orders',
					path: '/dashboard/orders',
					icon: <ShoppingBasket className={`${pathName === '/dashboard/orders' ? 'text-red-600' : 'text-white'}`} />,
				},
			],
		},
		{
			General__Settings: [
				{
					name: 'Staff',
					path: '/dashboard/staff',
					icon: <ReduceCapacity className={`${pathName === '/dashboard/staff' ? 'text-red-600' : 'text-white'}`} />,
				},
				{
					name: 'Settings',
					path: '/dashboard/settings',
					icon: <Settings className={`${pathName === '/dashboard/settings' ? 'text-red-600' : 'text-white'}`} />,
				},
			],
		},

	];


	return (
		<Drawer PaperProps={{ sx: { backgroundColor: "#991b1b", color: "white", marginTop: '79px' }}} variant="permanent" open={open}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{ open === false ? <ChevronRight className={`text-white`} /> : <ChevronLeft className={`text-white`} /> }
				</IconButton>
			</DrawerHeader>

			{
				paths.map((items: any, index: number) => (
					<div key={index}>
						{/* <ListSubheader className={`${open === false ? 'hidden invisible' : ''} bg-red-800 text-white text-base p-2 font-semibold`}>{ Object.keys(items)[0].toString().includes("__") ? Object.keys(items)[0].toString().replaceAll("__", " ") : Object.keys(items)[0].toString().replaceAll("_", " & ") }</ListSubheader>
						<Divider className={`${open === false ? 'hidden invisible' : ''} bg-white`} /> */}
						{
							items[Object.keys(items)[0]].map((item: any, indexx: number) =>
								<List key={indexx}>
									<Link href={item.path}>
										<ListItem key={index} disablePadding sx={{ display: 'block' }} className={`${pathName === item.path ? 'bg-white text-red-600' : '' }`}>
											<ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
												<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
													{ item.icon }
												</ListItemIcon>
													<ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
											</ListItemButton>
										</ListItem>
									</Link>
								</List>
							)
						}
					</div>
				))
			}
		</Drawer>
	)
}