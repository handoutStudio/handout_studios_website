'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Box, Tab, Tabs } from '@mui/material';
import Heading from '@/components/backoffice/Heading';
import { Loading } from '@/components/Loading/Loading';
import LargeCards from '@/components/backoffice/LargeCards';
import SmallCards from '@/components/backoffice/SmallCards';
import DashboardCharts from '@/components/backoffice/DashboardCharts';
import CustomerDataTable from '@/components/backoffice/CustomerDataTable';
import { AnalyticsRounded, DashboardRounded, GroupRounded } from '@mui/icons-material';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}


function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) { return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` }; }
  

export default function Page() {

	const { theme } = useTheme();
	const [value, setValue] = React.useState(0);
	const [getIsLoading, setIsLoading] = React.useState(true);
	
	const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

	return (
		<div>
			{
				getIsLoading
				?
					<Loading setIsLoading={setIsLoading} />
				:
					<div className={`flex flex-col`}>
						<Box>
							<Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ '& .MuiTab-textColorPrimary': { color: `${ theme === 'light' ? '#7c0104 !important' : '#FFFFFF !important'}` }, '& .MuiTabs-indicator': { backgroundColor: `${ theme === 'light' ? '#7c0104 !important' : '#FFFFFF !important'}` } }}>
								<Tab icon={<DashboardRounded />} label="Dashboard" {...a11yProps(0)} />
								<Tab icon={<AnalyticsRounded />} label="Sales & Profit" {...a11yProps(1)} />
								<Tab icon={<GroupRounded />} label="Customers" {...a11yProps(2)} />
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<Heading title={"Dashboard Overview"} />
							{/* TODO: Large Cards */}
							<LargeCards />
							{/* TODO: Small Cards */}
							<SmallCards />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<div className={`flex flex-col gap-5`}>
								<Heading title={"Sales & Profit"} />
								{/* TODO: Charts */}
								<DashboardCharts />
							</div>
						</CustomTabPanel>
						<CustomTabPanel value={value} index={2}>
							<Heading title={"Top Customers"} />
							{/* TODO: Recent Orders in Table */}
							<CustomerDataTable />
						</CustomTabPanel>
					</div>
			}
		</div>
	)

}
