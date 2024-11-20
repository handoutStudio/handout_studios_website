'use client';

import Link from 'next/link';
import * as React from 'react';
import { ChevronLeft, ChevronRight, ExpandLessRounded, ExpandMoreRounded, LensBlur  } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Zoom, Collapse, IconButton, Typography, Avatar } from '@mui/material';



export default function SideBarDesktop({open, openSubCatalogue, handleDrawerClose, getProps, DrawerHeader, Drawer, usePathname, paths}: any) {

	const pathName = usePathname();

	return (
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
	)
}