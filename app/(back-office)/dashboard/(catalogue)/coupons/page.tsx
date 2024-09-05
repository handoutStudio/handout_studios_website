'use client';

import * as React from 'react';
import { PageHeader } from '@/components/backoffice/PageHeader';

export default function page() {

	return (
		<div>
			<div>
				{/* TODO: Header */}
				<PageHeader pageTitle={'Coupons List'} link={'/dashboard/coupons/addCoupons'} buttonText={'Add Coupons'} />
			</div>

			{/* TODO: Table */}
			<div className={`py-4`}>
				<h2>Table</h2>
			</div>
		</div>
	)
}