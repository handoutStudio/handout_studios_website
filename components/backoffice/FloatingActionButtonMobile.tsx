'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { StyleRounded } from '@mui/icons-material';
import logo from '@/public/Assets/logo/compressed/final stamp 1.svg';
import { Box, Backdrop, SpeedDial, SpeedDialAction, Avatar } from '@mui/material';

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


export default function FloatingActionButtonMobile({ usePathname, paths, isTab, isMobile }: any) {

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
	const handleNestedOpenEnter = () => setNestedOpen(true);
	const handleNestedOpenLeave = () => setNestedOpen(false);
	const handleNestedClose = () => setNestedOpen(false);
	const handleNestedOpenClick = () => setNestedOpen(!nestedOpen);

	const { pathsReturn, subPathsReturn } = createData(paths);

	const handleOpenLink = (link: any) => {
		setParentOpen(false);
		setNestedOpen(false);
		router.replace(link);
	}

	return (
		<Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, zIndex: 100 }}>
			<Backdrop open={parentOpen} onClick={handleParentClose} />
			<SpeedDial className={`${parentOpen ? 'bg-[#7c0104] dark:bg-white' : 'bg-transparent'} rounded-full m-2 p-0`} ariaLabel="SpeedDial tooltip example" sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 9999 }} icon={ <Avatar src={logo.src} alt="Remy Sharp" className={`bg-white rounded-full p-2 w-10 h-10`}>{}</Avatar> } onClose={handleParentClose} onOpen={handleParentOpen} open={parentOpen} FabProps={{ className:`m-1`, size:'small' }}>
				<SpeedDialAction
					className={``}
					icon={<StyleRounded className={`${['attributes', 'banners', 'products', 'categories', 'coupons'].filter((item => pathName.includes(item))).length > 0 ? '' : '!text[#7C0104]'}`} />}
					tooltipTitle={`Catelogue`}
					tooltipOpen={ nestedOpen ? false : true }
					tooltipPlacement={ nestedOpen ? 'bottom' : 'left' }
					onMouseEnter={handleNestedOpenEnter}
					onMouseLeave={handleNestedOpenLeave}
					open={nestedOpen}
					onClick={handleNestedOpenClick}
					FabProps={{ className: `${['attributes', 'banners', 'products', 'categories', 'coupons'].filter((item => pathName.includes(item))).length > 0 ? '!bg-[#E20108] !text-white dark:!bg-white dark:!text-[#AF0106]' : '!text-[#7C0104] dark:bg-[#AF0106] dark:!text-white' } hover:!bg-[#E20108] hover:!text-white dark:hover:!bg-white dark:hover:!text-[#E20108] p-0 m-1`, size: 'small' }}
					classes={{ staticTooltipLabel: `${['attributes', 'banners', 'products', 'categories', 'coupons'].filter((item => pathName.includes(item))).length > 0 ? '!bg-[#E20108] !text-white dark:!bg-white dark:!text-[#AF0106]' : '!text-[#7C0104] dark:bg-[#AF0106] dark:!text-white' } m-0 p-2 text-sm rounded-xl` }}
				/>
				{
					pathsReturn.map((item: any) => (
						<SpeedDialAction
							className={``}
							key={item.name}
							icon={item.icon}
							tooltipTitle={item.name}
							tooltipOpen={ nestedOpen ? false : true }
							tooltipPlacement={ nestedOpen ? 'right' : 'left' }
							onClick={() => handleOpenLink(item.path)}
							FabProps={{ className: `${pathName === item.path ? '!bg-[#E20108] !text-white dark:!bg-white dark:!text-[#AF0106]' : '!text-[#7C0104] dark:bg-[#AF0106] dark:!text-white' } hover:!bg-[#E20108] hover:!text-white dark:hover:!bg-white dark:hover:!text-[#E20108] p-0 m-1`, size: 'small' }}
							classes={{ staticTooltipLabel: `${pathName === item.path ? '!bg-[#E20108] !text-white dark:!bg-white dark:!text-[#AF0106]' : '!text-[#7C0104] dark:bg-[#AF0106] dark:!text-white' } m-0 p-2 text-sm rounded-xl` }}
						/>
					))
				}
			</SpeedDial>
			<SpeedDial direction={"left"} className={`${nestedOpen ? 'bg-[#7c0104] dark:bg-white' : 'hidden invisible'} rounded-full m-2 p-0`} ariaLabel="Nested SpeedDial" sx={{ position: 'absolute', bottom: 80, right: 16 }} icon={<StyleRounded className={`bg-white rounded-full p-2 w-10 h-10`} />} onClose={handleNestedClose} open={nestedOpen} FabProps={{ className:`!bg-[#7c0104] hover:!bg-white dark:!bg-white dark:hover:!bg-[#7c0104]`, size:'small' }}>
				{
					subPathsReturn.map((item: any) => (
						<SpeedDialAction
							key={item.name}
							icon={item.icon}
							tooltipTitle={item.name}
							tooltipOpen
							onClick={ () => handleOpenLink(item.path) }
							FabProps={{ className: `${pathName === item.path ? '!bg-[#E20108] !text-white dark:!bg-white dark:!text-[#AF0106]' : '!text-[#7C0104] dark:bg-[#AF0106] dark:!text-white' } hover:!bg-[#E20108] hover:!text-white dark:hover:!bg-white dark:hover:!text-[#E20108] p-0 m-1`, size: 'small' }}
							classes={{ staticTooltipLabel: `${ isMobile ? 'pt-[2.5vw] pl-[2.5vw] pr-[2.5vw]' : isTab ? 'pt-[1vw] pl-[1vw] pr-[1vw]' : '' } ${pathName === item.path ? '!bg-[#E20108] !text-white dark:!bg-white dark:!text-[#AF0106]' : '!text-[#7C0104] dark:bg-[#AF0106] dark:!text-white' } m-0 text-sm rounded-full bottom-[4.5vh] left-[0.5vw] pb-[5.5vh] mb-[-4vh]` }}
							sx={{ '& #NestedSpeedDial-action-0-label, #NestedSpeedDial-action-1-label, #NestedSpeedDial-action-2-label, #NestedSpeedDial-action-3-label, #NestedSpeedDial-action-4-label': { writingMode: 'vertical-lr', textOrientation: 'upright' } }}
						/>
					))
				}
			</SpeedDial>
		</Box>
	);

}
