import * as React from 'react';
import Heading from '@/components/backoffice/Heading';
import LargeCards from '@/components/backoffice/LargeCards';
import SmallCards from '@/components/backoffice/SmallCards';
import DashboardCharts from '@/components/backoffice/DashboardCharts';
import CustomerDataTable from '@/components/backoffice/CustomerDataTable';

export default function page() {

	return (
		<div>
			<Heading title={"Dashboard Overview"} />
			{/* TODO: Large Cards */}
			<LargeCards />
			{/* TODO: Small Cards */}
			<SmallCards />
			{/* TODO: Charts */}
			<DashboardCharts />
			{/* TODO: Recent Orders in Table */}
			<CustomerDataTable />
		</div>
	)

}
