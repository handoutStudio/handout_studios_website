'use client';

import * as React from 'react';
import { Data } from '@/components/Interfaces/ICategoryData';
import { PageHeader } from '@/components/backoffice/PageHeader';
import TableBulkDelete from '@/components/backoffice/TableBulkDelete';

export default function page() {

	return (
		<div>
			<div>
				{/* TODO: Header */}
				<PageHeader pageTitle={'Banner'} link={'/dashboard/banners/addBanner'} buttonText={'Add Banner'} />
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
