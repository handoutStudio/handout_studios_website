'use client';

import Link from 'next/link';
import * as React from 'react';
import { useTheme } from 'next-themes';
import { Global } from '@emotion/react';
import { grey } from '@mui/material/colors';
import MuiDrawer from '@mui/material/Drawer';
import { usePathname } from 'next/navigation';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Theme, CSSObject, Tooltip, Zoom, Collapse, IconButton, Typography, Avatar, SwipeableDrawer, CssBaseline } from '@mui/material';
import { Category, ChevronLeft, ChevronRight, ConfirmationNumberRounded, Diversity1, EditAttributesRounded, ExpandLessRounded, ExpandMoreRounded, Groups3, Inventory, LensBlur, LocalLibraryRounded, LocalShippingRounded, Loyalty, OpenInNew, ReduceCapacity, Settings, SpaceDashboard, Store, Storefront, Style, WalletRounded,  } from '@mui/icons-material';


const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({ width: drawerWidth, transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }), overflowX: 'hidden' });
const closedMixin = (theme: Theme): CSSObject => ({ transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }), overflowX: 'hidden', width: `calc(${theme.spacing(7)} + 1px)`, [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` }});
// necessary for content to be below app bar
const DrawerHeader = styled('div')(({ theme }) => ({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: theme.spacing(0, 1), ...theme.mixins.toolbar }));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({ width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }), ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) })}));


// Mobile
const drawerBleeding = 56;
const StyledBox = styled('div')(({ theme }) => ({ backgroundColor: '#7c0104', ...theme.applyStyles('dark', { backgroundColor: grey[800] }) }));
const Puller = styled('div')(({ theme }) => ({ width: 30, height: 6, backgroundColor: grey[300], borderRadius: 3, position: 'absolute', top: 8, left: 'calc(50% - 15px)', ...theme.applyStyles('dark', { backgroundColor: grey[900] }) }));

export default function Sidebar() {

	const { theme } = useTheme();
	const pathName = usePathname();
	const [openSubCatalogue, setOpenSubCatalogue] = React.useState(false);


	const paperProps = React.useMemo(() => { return { sx: { backgroundColor: "#7c0104", color: "white", marginTop: '80px' }}}, [] );
	const paperPropsDark = React.useMemo(() => { return { sx: { backgroundColor: "#2D333A", color: "#7c0104", marginTop: '80px' }}}, []);

	const [open, setOpen] = React.useState(true); // Change this to default false at the end of editing.
	const handleDrawerClose = () => setOpen(!open);
	const [getProps, setProps] = React.useState(paperProps);

	React.useEffect(() => {
		if(theme === 'light') setProps(paperProps);
		else setProps(paperPropsDark);
	}, [paperProps, paperPropsDark, theme]);

	const handleOpenCatelogue = () => setOpenSubCatalogue(!openSubCatalogue)

	const paths = [
		{
			Stats_More: [
				{
					name: 'Dashboard',
					path: '/dashboard',
					icon: <SpaceDashboard className={`${pathName === '/dashboard' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
				{
					name: 'Catalogue',
					path: '',
					icon: <Style className={`text-white`} />,
					iconEnd: '',
					openFunction: handleOpenCatelogue,
					subList: [
						{
							name: 'Attributes',
							path: '/dashboard/attributes',
							icon: <EditAttributesRounded className={`${pathName === '/dashboard/attributes' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
							iconEnd: '',
							subList: [],
						},
						{
							name: 'Banners',
							path: '/dashboard/banners',
							icon: <ConfirmationNumberRounded className={`${pathName === '/dashboard/banners' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
							iconEnd: '',
							subList: [],
						},
						{
							name: 'Products',
							path: '/dashboard/products',
							icon: <Inventory className={`${pathName === '/dashboard/products' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
							iconEnd: '',
							subList: [],
						},
						{
							name: 'Categories',
							path: '/dashboard/categories',
							icon: <Category className={`${pathName === '/dashboard/categories' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
							iconEnd: '',
							subList: [],
						},
						{
							name: 'Coupons',
							path: '/dashboard/coupons',
							icon: <Loyalty className={`${pathName === '/dashboard/coupons' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
							iconEnd: '',
							subList: [],
						}
					],
				},
				{
					name: 'Sellers',
					path: '/dashboard/sellers',
					icon: <Groups3 className={`${pathName === '/dashboard/sellers' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
				{
					name: 'Markets',
					path: '/dashboard/markets',
					icon: <Store className={`${pathName === '/dashboard/markets' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
			],
		},
		{
			Customers_Orders: [
				{
					name: 'Customers',
					path: '/dashboard/customers',
					icon: <Diversity1 className={`${pathName === '/dashboard/customers' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
				{
					name: 'Orders',
					path: '/dashboard/orders',
					icon: <LocalShippingRounded className={`${pathName === '/dashboard/orders' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
				{
					name: 'Community',
					path: '/dashboard/community',
					icon: <LocalLibraryRounded className={`${pathName === '/dashboard/community' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
				{
					name: 'Wallet',
					path: '/dashboard/wallet',
					icon: <WalletRounded className={`${pathName === '/dashboard/wallet' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
			],
		},
		{
			General__Settings: [
				{
					name: 'Staff',
					path: '/dashboard/staff',
					icon: <ReduceCapacity className={`${pathName === '/dashboard/staff' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
				{
					name: 'Settings',
					path: '/dashboard/settings',
					icon: <Settings className={`${pathName === '/dashboard/settings' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: '',
					openFunction: '',
					subList: [],
				},
				{
					name: 'Online Store',
					path: '/dashboard/online-store',
					icon: <Storefront className={`${pathName === '/dashboard/online-store' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					iconEnd: <OpenInNew className={`${pathName === '/dashboard/online-store' ? 'dark:text-white text-[#7c0104]' : 'text-white'}`} />,
					subList: [],
				},
			],
		},

	];


	
	
	// Mobile
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const [isDesktop, setDesktop] = React.useState(false);
	React.useEffect(() => {
		if (window.innerWidth > 1450) { setDesktop(true); }
		else { setDesktop(false); }
	
		const updateMedia = () => {
			if (window.innerWidth > 950) { setDesktop(true); }
			else { setDesktop(false); }
		};

		window.addEventListener('resize', updateMedia);
		return () => window.removeEventListener('resize', updateMedia);
	}, []);

	return (
		<>
			{
				isDesktop
				?
					<div className={`border-r-[1px] border-white`}>
						<Drawer PaperProps={ getProps } variant="permanent" open={open}>
							<DrawerHeader>

								<div className={`flex gap-7`}>
									<button className={`min-[800px]:hidden min-[800px]:invisible`}>
										<div className={`flex flex-row justify-center gap-2 items-center w-full`}>
											<Avatar alt="Remy Sharp" className={`bg-transparent text-white w-10 h-10`}>
												<LensBlur fontSize={"large"} />
											</Avatar>
											{' '}
											<Typography className={`!text-white text-sm`} variant={'h5'} component={'h5'}>Handout Studios</Typography>
										</div>
									</button>
									<Tooltip title={ open === false ? "Expand" : "Collapse" } placement="right" TransitionComponent={Zoom} followCursor>
										<IconButton onClick={handleDrawerClose}>
											{ open === false ? <ChevronRight className={`text-white`} /> : <ChevronLeft className={`text-white`} /> }
										</IconButton>
									</Tooltip>
								</div>
							</DrawerHeader>
							{
								paths.map((items: any, index: number) => (
									<div key={index}>
										{
											items[Object.keys(items)[0]].map((item: any, indexx: number) =>
												<List key={indexx}>
													<Tooltip title={item.name} placement="right" TransitionComponent={Zoom} followCursor>
														<Link href={item.path}>
															<ListItem key={index} disablePadding sx={{ display: 'block' }} className={`${pathName === item.path ? 'dark:text-white text-[#7c0104] bg-white dark:bg-[#AF0106]' : 'text-white' }`}>
																<ListItemButton onClick={ item.openFunction } sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
																	
																	<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
																		{ item.icon }
																	</ListItemIcon>
																	<ListItemText className={`flex flex-row gap-10`} primary={item.name} secondary={ item.iconEnd } sx={{ opacity: open ? 1 : 0 }} />
																	{ item.subList.length > 0 ? (openSubCatalogue ? <ExpandLessRounded /> : <ExpandMoreRounded />)  : ''}
																</ListItemButton>
																{
																	item.subList.length > 0 && (
																		<Collapse in={openSubCatalogue} timeout="auto" unmountOnExit>
																			<List component="div" disablePadding>
																				{
																					item.subList.map((subItem: any, indexx: number) =>
																						<Tooltip title={subItem.name} placement="right" TransitionComponent={Zoom} followCursor key={indexx}>
																							<Link href={subItem.path}>
																								<ListItem key={index} disablePadding sx={{ display: 'block' }} className={`${pathName === subItem.path ? 'dark:text-white text-[#7c0104] bg-white dark:bg-[#AF0106]' : 'text-white' }`}>
																									<ListItemButton sx={{ pl: 4 }}>
																										<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
																											{ subItem.icon }
																										</ListItemIcon>
																										<ListItemText className={`flex flex-row gap-10`} primary={subItem.name} secondary={ subItem.iconEnd } sx={{ opacity: open ? 1 : 0 }} />
																									</ListItemButton>
																								</ListItem>
																							</Link>
																						</Tooltip>
																					)
																				}
																			</List>
																		</Collapse>
																	)
																}
															</ListItem>
														</Link>
													</Tooltip>
												</List>
											)
										}
									</div>
								))
							}
						</Drawer>
					</div>
				:
					<div className={`max-[949px]:visible min-[950px]:invisible min-[950px]:hidden`}>
						<CssBaseline />
						<Global styles={{ '.MuiDrawer-root > .MuiPaper-root': { height: `calc(50% - ${drawerBleeding}px)`, overflow: 'visible' }}} />
						<SwipeableDrawer anchor="bottom" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} swipeAreaWidth={drawerBleeding} disableSwipeToOpen={false} ModalProps={{ keepMounted: true }}>
							<StyledBox sx={{ position: 'absolute', top: -drawerBleeding, borderTopLeftRadius: 8, borderTopRightRadius: 8, visibility: 'visible', right: 0, left: 0 }}>
								<Puller />
								<Typography sx={{ p: 2, color: 'white' }}>Navigations</Typography>
							</StyledBox>
							<StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
								{
									paths.map((items: any, index: number) => (
										<div key={index}>
											{
												items[Object.keys(items)[0]].map((item: any, indexx: number) =>
													<List key={indexx}>
														<Tooltip title={item.name} placement="right" TransitionComponent={Zoom} followCursor>
															<Link href={item.path}>
																<ListItem key={index} disablePadding sx={{ display: 'block' }} className={`${pathName === item.path ? 'dark:text-white text-[#7c0104] bg-white dark:bg-[#AF0106]' : 'text-white' }`}>
																	<ListItemButton onClick={ item.openFunction } sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
																		
																		<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
																			{ item.icon }
																		</ListItemIcon>
																		<ListItemText className={`flex flex-row gap-10`} primary={item.name} secondary={ item.iconEnd } sx={{ opacity: open ? 1 : 0 }} />
																		{ item.subList.length > 0 ? (openSubCatalogue ? <ExpandLessRounded /> : <ExpandMoreRounded />)  : ''}
																	</ListItemButton>
																	{
																		item.subList.length > 0 && (
																			<Collapse in={openSubCatalogue} timeout="auto" unmountOnExit>
																				<List component="div" disablePadding>
																					{
																						item.subList.map((subItem: any, indexx: number) =>
																							<Tooltip title={subItem.name} placement="right" TransitionComponent={Zoom} followCursor key={indexx}>
																								<Link href={subItem.path}>
																									<ListItem key={index} disablePadding sx={{ display: 'block' }} className={`${pathName === subItem.path ? 'dark:text-white text-[#7c0104] bg-white dark:bg-[#AF0106]' : 'text-white' }`}>
																										<ListItemButton sx={{ pl: 4 }}>
																											<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
																												{ subItem.icon }
																											</ListItemIcon>
																											<ListItemText className={`flex flex-row gap-10`} primary={subItem.name} secondary={ subItem.iconEnd } sx={{ opacity: open ? 1 : 0 }} />
																										</ListItemButton>
																									</ListItem>
																								</Link>
																							</Tooltip>
																						)
																					}
																				</List>
																			</Collapse>
																		)
																	}
																</ListItem>
															</Link>
														</Tooltip>
													</List>
												)
											}
										</div>
									))
								}
							</StyledBox>
						</SwipeableDrawer>
					</div>
				}
		</>
	)
}