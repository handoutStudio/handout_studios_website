'use client';

import * as React from 'react';
import { ICategoryData } from '@/components/Interfaces/ICategoryData';
import { PageHeader } from '@/components/backoffice/PageHeader';
import TableBulkDelete from '@/components/backoffice/TableBulkDelete';

export default function page() {
	
	function createData(id: number, title: string, calories: number, fat: number, carbs: number, protein: number): ICategoryData { return { id, title, calories, fat, carbs, protein }; }
	
	const rows = [
		createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
		createData(2, 'Donut', 452, 25.0, 51, 4.9),
		createData(3, 'Eclair', 262, 16.0, 24, 6.0),
		createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
		createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
		createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
		createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
		createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
		createData(9, 'KitKat', 518, 26.0, 65, 7.0),
		createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
		createData(11, 'Marshmallow', 318, 0, 81, 2.0),
		createData(12, 'Nougat', 360, 19.0, 9, 37.0),
		createData(13, 'Oreo', 437, 18.0, 63, 4.0),
	];

	return (
		<div>
			{/* TODO: Header */}
			<div className={`p-5`}>
				<PageHeader pageTitle={'Categories List'} link={'/dashboard/categories/addCategory'} buttonText={'Add Category'} dataRows={rows} workSheetName={"CategoryList"} XLSXName={"CategoryData"} />
			</div>
			{/* TODO: Table */}
			<div className={`py-4`}>
				<TableBulkDelete rows={ rows } tableTitle={`Categories`} />
			</div>
		</div>
	)
}
