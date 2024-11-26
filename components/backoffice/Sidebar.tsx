'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import MuiDrawer from '@mui/material/Drawer';
import { usePathname } from 'next/navigation';
import SideBarDesktop from './SideBarDesktop';
import { styled, Theme, CSSObject} from '@mui/material';
import FloatingActionButtonMobile from './FloatingActionButtonMobile';
import { Category, ConfirmationNumberRounded, Diversity1, EditAttributesRounded, Groups3, Inventory, LocalLibraryRounded, LocalShippingRounded, Loyalty, OpenInNew, ReduceCapacity, Settings, SpaceDashboard, Store, Storefront, Style, WalletRounded,  } from '@mui/icons-material';

export default function Sidebar({ width, height }: any) {

	const { theme } = useTheme();
	const pathName = usePathname();
	const [isTab, setTab] = React.useState(false);
	const [isMobile, setMobile] = React.useState(false);
	const [isDesktop, setDesktop] = React.useState(false);
	const [openSubCatalogue, setOpenSubCatalogue] = React.useState(false);

	const drawerWidth = 240;
	const openedMixin = (theme: Theme): CSSObject => ({ width: drawerWidth, transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }), overflowX: 'hidden' });
	const closedMixin = (theme: Theme): CSSObject => ({ transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }), overflowX: 'hidden', width: `calc(${theme.spacing(7)} + 1px)`, [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` }});
	// necessary for content to be below app bar
	const DrawerHeader = styled('div')(({ theme }) => ({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: theme.spacing(0, 1), ...theme.mixins.toolbar }));
	const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({ width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }), ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) })}));

	const paperProps = React.useMemo(() => { return { sx: { backgroundColor: "#7c0104", color: "white", marginTop: '80px' }}}, [] );
	const paperPropsDark = React.useMemo(() => { return { sx: { backgroundColor: "#2D333A", color: "#7c0104", marginTop: '80px' }}}, []);

	const [open, setOpen] = React.useState(false);
	const handleDrawerClose = () => setOpen(!open);
	const [getProps, setProps] = React.useState(paperProps);

	React.useEffect(() => {
		theme === 'light' ? setProps(paperProps) : setProps(paperPropsDark)

		width > 950
		?
			(setDesktop(true), setTab(false), setMobile(false) )
		:
			width > 500 && width <= 950
			?
				(setTab(true), setMobile(false), setDesktop(false))
			:
				width > 375 && width <= 500
				?
					(setMobile(true), setTab(false), setDesktop(false))
				:
					setDesktop(false)
	}, [paperProps, paperPropsDark, theme, width, height]);

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

	return (
		<>
			{
				isDesktop
				?
					<SideBarDesktop open = { open } openSubCatalogue = { openSubCatalogue } handleDrawerClose = { handleDrawerClose } getProps = { getProps } DrawerHeader = { DrawerHeader } Drawer = { Drawer } usePathname = { usePathname } paths = { paths } />
				:
					isTab || isMobile
					?
						<div className={`fixed top-[98vh] left-[100%] z-50`}>
							<FloatingActionButtonMobile usePathname = { usePathname } paths = { paths } isDesktop = { isDesktop } isMobile = { isMobile } isTab = { isTab } />
						</div>
					:
						null
				}
		</>
	)
}