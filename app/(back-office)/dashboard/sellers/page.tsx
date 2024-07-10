'use client';

import * as React from 'react';
import { PageHeader } from '@/components/backoffice/PageHeader';
import TableBulkDelete from '@/components/backoffice/TableBulkDelete';

export default function page() {
	return (
		<div>
			<div>
				{/* TODO: Header */}
				<PageHeader pageTitle={'Sellers'} link={'/dashboard/sellers/addSellers'} buttonText={'Add Sellers'} />
			</div>

			<div>
				{/* 
					- image => userInput()
					- Description => userInput()
					- URL => auto()
				*/}
				{/* TODO: Table */}
				
				<div className={`py-4`}>
					<h2>Table</h2>
				</div>
			</div>
		</div>
	)
}