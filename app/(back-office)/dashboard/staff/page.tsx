'use client';

import * as React from 'react';
import { PageHeader } from '@/components/backoffice/PageHeader';

export default function page() {
	return (
		<div>
			{/* TODO: Header */}
			<div className={`p-5`}>
				<PageHeader pageTitle={'Our Staff'} link={'/dashboard/staff/addStaff'} buttonText={'Add Staff'} />
			</div>
			{/* TODO: Table */}
			<div className={`py-4`}>
				Table
			</div>
		</div>
	)
}