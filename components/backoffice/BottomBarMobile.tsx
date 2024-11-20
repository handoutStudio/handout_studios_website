'use client';

import Link from 'next/link';
import * as React from 'react';
import { Masonry } from '@mui/lab';
import { Global } from '@emotion/react';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Tooltip, Zoom, Typography, SwipeableDrawer, CssBaseline, AccordionSummary, Accordion, Avatar, IconButton, Box } from '@mui/material';




export default function BottomBarMobile({drawerBleeding, StyledBox, Puller, usePathname, paths, openSubCatalogue, setOpenSubCatalogue}:any) {

	const pathName = usePathname();
	const [open, setOpen] = React.useState(true);

	// Mobile
	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	return (
		<div className={`max-[949px]:visible min-[950px]:invisible min-[950px]:hidden`}>
			<CssBaseline />
			<Global styles={{ '.MuiDrawer-root > .MuiPaper-root': { height: `calc(50% - ${drawerBleeding}px)`, overflow: 'visible' }}} />
			<SwipeableDrawer anchor="bottom" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} swipeAreaWidth={drawerBleeding} disableSwipeToOpen={false} ModalProps={{ keepMounted: true }}>
				<StyledBox sx={{ position: 'absolute', top: -drawerBleeding, borderTopLeftRadius: 8, borderTopRightRadius: 8, visibility: 'visible', right: 0, left: 0 }}>
					<Puller />
					<Typography sx={{ p: 2, color: 'white' }}>Navigations</Typography>
				</StyledBox>
				<StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
					<Masonry columns={{ xs: 2, sm: 3 }} spacing={2}>
					{
						paths.map((items: any, index: number) => (
							<div key={index} className={`${pathName === items.path ? 'dark:text-white text-[#7c0104] bg-white dark:bg-[#AF0106]' : 'text-white' } flex flex-col justify-center items-center gap-2`}>
								{
									items[Object.keys(items)[0]].map((item: any, indexx: number) => (
										<Tooltip key={indexx} title={item.name} placement="right" TransitionComponent={Zoom} followCursor>
											<Link href={item.path}>
												<div className={`${pathName === item.path ? 'dark:text-white text-[#7c0104] bg-white dark:bg-[#AF0106]' : 'text-white' } flex flex-col items-center p-2 elevate-1 rounded-lg`}>
													{
														item.subList.length > 0
														?
															(
																<>
																	<Typography variant="subtitle1" gutterBottom>
																		<Accordion className={`w-full !bg-transparent z-0 !text-white`} square expanded={openSubCatalogue} onChange={() => setOpenSubCatalogue(!openSubCatalogue)} elevation={0}>
																				<AccordionSummary expandIcon={<ExpandMoreRounded className={`text-white`} />}>
																					<div className={`flex flex-col justify-center items-center gap-2 w-full`}>
																						<Avatar alt="Remy Sharp" className={`!bg-transparent !text-white w-10 h-10`}>
																							<IconButton sx={{ p: '10px' }} aria-label={item.name}>
																								{ item.icon }
																							</IconButton>
																						</Avatar>
																						<Typography className={`!text-white`} variant="subtitle1"> {item.name} </Typography>
																					</div>
																				</AccordionSummary>
																				<Box className={`${openSubCatalogue ? '' : 'hidden invisible'}`} key={indexx} sx={{ borderColor: 'white', borderWidth: '1px', borderStyle: 'solid', borderRadius: 1, p: 1 }}>
																				{
																					item.subList.map((subItem: any, indexx: number) => (																						
																						<Tooltip title={subItem.name} placement="right" TransitionComponent={Zoom} followCursor key={indexx}>
																							<Link href={subItem.path}>
																								<div className={`${pathName === subItem.path ? 'dark:text-white text-[#7c0104] bg-white dark:bg-[#AF0106]' : 'text-white' } flex flex-col justify-center items-center gap-2 w-full rounded-lg`} key={indexx}>
																									<Avatar alt="Remy Sharp" className={`!bg-transparent !text-white w-10 h-10`}>
																										<IconButton sx={{ p: '10px' }} aria-label={subItem.name}>
																											{ subItem.icon }
																										</IconButton>
																									</Avatar>
																									<Typography variant="subtitle1"> {subItem.name} </Typography>
																								</div>
																							</Link>
																						</Tooltip>
																					))
																				}
																				</Box>
																		</Accordion>
																	</Typography>
																</>
															)
														:
															(
																<>
																	<IconButton sx={{ p: '10px' }} aria-label={item.name}>
																		{ item.icon }
																	</IconButton>

																	<Typography variant="subtitle1" gutterBottom>
																		{item.name}
																	</Typography>
																</>
															)
													}
												</div>
											</Link>
										</Tooltip>
									))
								}
							</div>
						))
					}
					</Masonry>
				</StyledBox>
			</SwipeableDrawer>
		</div>
	)
}