'use client';

import * as React from 'react';
import { PageHeader } from '@/components/backoffice/PageHeader';

export default function page() {
	return (
		<div>
			{/* TODO: Header */}
			<PageHeader pageTitle={'Products'} link={'/dashboard/products/addProducts'} buttonText={'Add Products'} />
		</div>
	)
}
