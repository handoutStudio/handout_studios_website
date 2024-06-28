'use client';

import * as React from 'react';

import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, TableHead, Typography } from '@mui/material/';

interface Column {
	id: 'name' | 'code' | 'population' | 'size' | 'density';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
	{ id: 'population', label: 'Population', minWidth: 170, align: 'right', format: (value: number) => value.toLocaleString('en-US'), },
	{ id: 'size', label: 'Size\u00a0(km\u00b2)', minWidth: 170, align: 'right', format: (value: number) => value.toLocaleString('en-US'), },
	{ id: 'density', label: 'Density', minWidth: 170, align: 'right', format: (value: number) => value.toFixed(2), },
];

interface Data {
	name: string;
	code: string;
	population: number;
	size: number;
	density: number;
}

function createData( name: string, code: string, population: number, size: number ): Data {
	const density = population / size;
	return { name, code, population, size, density };
}

const rows = [
	createData('India', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767),
];

export default function CustomerDataTable() {

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(+event.target.value);
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<div className={`flex flex-col mt-10 justify-center bg-[#7c0104] dark:bg-[#AF0106] rounded-2xl p-4 mb-5`}>
			<Paper sx={{ width: '100%', overflow: 'hidden' }} className={`rounded-2xl`}>
				<Typography className={`p-2 underline underline-offset-4 text-[#7c0104]`} variant={`h4`} component={'h4'}>Customer Data Table</Typography>
				<TableContainer sx={{ maxHeight: 500 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{ columns.map((column) => <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} > { column.label } </TableCell>) }
							</TableRow>
						</TableHead>
						<TableBody>
							{
								rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
											{
												columns.map((column) => {
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{ column.format && typeof value === 'number' ? column.format(value) : value }
														</TableCell>
													);
												})
											}
										</TableRow>
									);
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
			</Paper>
		</div>
	)
}
