'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/public/Assets/logo/compressed/final stamp 1.svg';
import { Box, Backdrop, SpeedDial, SpeedDialAction, Avatar } from '@mui/material';
import { StyleRounded } from '@mui/icons-material';

const createData = (paths: any) => {
	const copyPath:any = paths;
	const pathsReturn: any = [];
	const subPathsReturn: any = [];

	copyPath.map((items: any) => {
		items[Object.keys(items)[0]].map((item: any) => {
			item = { ...item, icon: { ...item.icon, props: { ...item.icon.props, className: "`${pathName === item.path ? '!text-[#7c0104]' : '!text-white'}`" }} };
			item.subList.length > 0
			?
				item.subList.map((subItem: any) => {
					subItem = { ...subItem, icon: { ...subItem.icon, props: { ...subItem.icon.props, className: "`${pathName === item.path ? '!text-[#7c0104]' : '!text-white'}`" }} };
					subPathsReturn.push(subItem)
				})
			:
				pathsReturn.push(item);
		})
	});

	return {pathsReturn, subPathsReturn};
}


export default function FloatingActionButtonMobile({ usePathname, paths }: any) {

	const pathName = usePathname();	
	const router = useRouter();

	// States for the parent and nested SpeedDials
	const [parentOpen, setParentOpen] = React.useState(false);
	const [nestedOpen, setNestedOpen] = React.useState(false);
  
	// Functions to handle parent SpeedDial open/close
	const handleParentOpen = () => setParentOpen(true);
	const handleParentClose = () => {
	  setParentOpen(false);
	  setNestedOpen(false); // Close nested when parent closes
	};
  
	// Functions to handle nested SpeedDial open/close
	const handleNestedOpen = () => setNestedOpen(true);
	const handleNestedClose = () => setNestedOpen(false);

	const { pathsReturn, subPathsReturn } = createData(paths);

	const handleOpenLink = (link: any) => {
		router.replace(link);
	}

	return (
		<Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, zIndex: 100 }}>
			<Backdrop open={parentOpen} onClick={handleParentClose} />
			<SpeedDial className={`${parentOpen ? 'bg-[#7c0104] dark:bg-white' : ''} rounded-full`} color={`#7c0104`} ariaLabel="SpeedDial tooltip example" sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 9999 }} icon={ <Avatar src={logo.src} alt="Remy Sharp" className={`bg-white rounded-full p-2 w-10 h-10`}>{}</Avatar> } onClose={handleParentClose} onOpen={handleParentOpen} open={parentOpen} FabProps={{ className:`!bg-[#7c0104] hover:!bg-white dark:!bg-white dark:hover:!bg-[#7c0104]`, size:'small' }}>
				<SpeedDialAction
					className={`'!text-[#7c0104] dark:!text-white !bg-white dark:!bg-white p-0 m-0`}
					icon={<StyleRounded className={`${['attributes', 'banners', 'products', 'categories', 'coupons'].filter((item => pathName.includes(item))).length > 0 ? '!text-[#7c0104]' : '!text-white dark:!text-[#AF0106]'}`} />}
					tooltipTitle={`Catelogue`}
					tooltipOpen={ nestedOpen ? false : true }
					onMouseEnter={handleNestedOpen}
					FabProps={{ className: `${['attributes', 'banners', 'products', 'categories', 'coupons'].filter((item => pathName.includes(item))).length > 0 ? '!text-[#7c0104] !bg-white dark:!bg-[#AF0106] dark:!text-white' : '!bg-[#7c0104] hover:!bg-white hover:!text-[#7c0104] dark:!bg-white dark:hover:!bg-[#2d333a] dark:hover:!text-white' } text-white dark:!text-[#AF0106] p-0 m-1`, size: 'small' }}
					classes={{ staticTooltipLabel: `${['attributes', 'banners', 'products', 'categories', 'coupons'].filter((item => pathName.includes(item))).length > 0 ? 'dark:!bg-[#AF0106] dark:!text-white !text-[#7c0104] !bg-white' : '!bg-[#7c0104] !text-white dark:!text-[#AF0106] dark:!bg-white' } rounded-xl text-sm` }}
				/>
				{
					pathsReturn.map((item: any) => (
						<SpeedDialAction
						className={`${pathName === item.path ? '!text-[#7c0104] dark:!text-white' : '!text-[#7c0104] dark:!text-white' } !bg-white dark:!bg-white p-0 m-0`}
						key={item.name}
						icon={item.icon}
						tooltipTitle={item.name}
						tooltipOpen={ nestedOpen ? false : true }
						onClick={() => handleOpenLink(item.path)}
						FabProps={{ className: `${pathName === item.path ? '!text-[#7c0104] !bg-white dark:!bg-[#AF0106] dark:!text-white' : '!bg-[#7c0104] hover:!bg-white hover:!text-[#7c0104] dark:!bg-white dark:hover:!bg-[#2d333a] dark:hover:!text-white' } text-white dark:!text-[#AF0106] p-0 m-1`, size: 'small' }}
						classes={{ staticTooltipLabel: `${pathName === item.path ? 'dark:!bg-[#AF0106] dark:!text-white !text-[#7c0104] !bg-white' : '!bg-[#7c0104] !text-white dark:!text-[#AF0106] dark:!bg-white' } rounded-xl text-sm` }}
						/>
					))
				}
			</SpeedDial>
			<SpeedDial direction={"left"} className={`${nestedOpen ? '' : 'hidden invisible'}`} ariaLabel="Nested SpeedDial" sx={{ position: 'absolute', bottom: 550, right: 25 }} icon={<StyleRounded />} onClose={handleNestedClose} open={nestedOpen} FabProps={{ className:`!bg-[#7c0104] hover:!bg-white dark:!bg-white dark:hover:!bg-[#7c0104]`, size:'small' }}>
				{
					subPathsReturn.map((item: any) => (
						<SpeedDialAction
							className={`${pathName === item.path ? '!text-[#7c0104] dark:!text-white' : '!text-[#7c0104] dark:!text-white'} !bg-white dark:!bg-white p-0 m-0`} 
							key={item.name}
							icon={item.icon}
							tooltipTitle={item.name}
							onClick={ () => handleOpenLink(item.path) }
							FabProps={{ className:`${pathName === item.path ? '!text-[#7c0104] !bg-white dark:!bg-[#AF0106] dark:!text-white' :'!bg-[#7c0104] hover:!bg-white hover:!text-[#7c0104] dark:!bg-white dark:hover:!bg-[#2d333a] dark:hover:!text-white' } text-white dark:!text-[#AF0106] p-0 m-1`, size:'small' }}
							classes={{ staticTooltipLabel:`${pathName === item.path ? 'dark:!bg-[#AF0106] dark:!text-white !text-[#7c0104] !bg-white' : '!bg-[#7c0104] !text-white dark:!text-[#AF0106] dark:!bg-white'} rounded-xl text-sm`}} 
						/>
					))
				}
			</SpeedDial>
		</Box>
	);

}