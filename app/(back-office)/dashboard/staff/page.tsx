'use client';

import * as React from 'react';
import { PageHeader } from '@/components/backoffice/PageHeader';

export default function page() {
	return (
		<div>
			{/* TODO: Header */}
			<PageHeader pageTitle={'Our Staff'} link={'/dashboard/staff/addStaff'} buttonText={'Add Staff'} />
		</div>
	)
}
