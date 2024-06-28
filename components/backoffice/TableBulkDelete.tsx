import * as React from 'react';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import { Delete } from '@mui/icons-material';
import { Data } from '../Interfaces/ICategoryData';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, Snackbar, Slide, Alert } from '@mui/material';


type Order = 'asc' | 'desc';
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) { return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0 }
function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number { return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy); }

export default function TableBulkDelete({rows, tableTitle}: any) {
	const [page, setPage] = React.useState(0);
	const [order, setOrder] = React.useState<Order>('asc');
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [getSnackbarState, setSnackbarState] = React.useState(false);
	const [selected, setSelected] = React.useState<readonly number[]>([]);
	const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');

	interface HeadCell {
		disablePadding: boolean;
		id: keyof Data;
		label: string;
		numeric: boolean;
	}

	const headCells: readonly HeadCell[] = [
		{
			id: 'title',
			numeric: false,
			disablePadding: true,
			label: 'Dessert (100g serving)',
		},
		{
			id: 'calories',
			numeric: true,
			disablePadding: false,
			label: 'Calories',
		},
		{
			id: 'fat',
			numeric: true,
			disablePadding: false,
			label: 'Fat (g)',
		},
		{
			id: 'carbs',
			numeric: true,
			disablePadding: false,
			label: 'Carbs (g)',
		},
		{
			id: 'protein',
			numeric: true,
			disablePadding: false,
			label: 'Protein (g)',
		},
	];

	// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
	// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
	// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
	// with exampleArray.slice().sort(exampleComparator)
	function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
		const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map((n: any) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: readonly number[] = [];

		selectedIndex === -1
		?
			newSelected = newSelected.concat(selected, id)
		:
			selectedIndex === 0
			?
				newSelected = newSelected.concat(selected.slice(1))
			:
				selectedIndex === selected.length - 1
				?
					newSelected = newSelected.concat(selected.slice(0, -1))
				:
					selectedIndex > 0
					?
						newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
					:
						null
		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	
	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(() => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage ), [order, orderBy, page, rowsPerPage, rows]);

	const handleDelete = (selected: any) => {
		selected.length === 0
		?
			setSnackbarState(!getSnackbarState)
		:
			{/* TODO: Delete Selected Rows Data */}
			console.log(selected)
	}

	const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => { handleRequestSort(event, property); };
	
	return (
		<Box sx={{ width: '100%', backgroundColor: '#7c0104', padding: '0.5vw', borderRadius: '0.5vw' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(selected.length > 0 && { bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) })}}>
					{
						selected.length > 0
						?
							<Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div"> { selected.length } selected </Typography>
						:
							<Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div" > { tableTitle } </Typography>
					}
					<Tooltip title="Delete">
						<IconButton onClick={() => handleDelete(selected)}>
							<Delete />
						</IconButton>
					</Tooltip>
				</Toolbar>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox color="primary" indeterminate={selected.length > 0 && selected.length < rows.length} checked={rows.length > 0 && selected.length === rows.length} onChange={handleSelectAllClick} inputProps={{ 'aria-label': 'select all desserts' }} />
								</TableCell>
								{
									headCells.map((headCell) => (
										<TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
											<TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
												{ headCell.label }
												{ orderBy === headCell.id ? <Box component="span" sx={visuallyHidden}> { order === 'desc' ? 'sorted descending' : 'sorted ascending' } </Box> : null }
											</TableSortLabel>
										</TableCell>
									))
								}
							</TableRow>
						</TableHead>
						<TableBody>
							{
								visibleRows.map((row, index) => {
									const isItemSelected = isSelected(Number(row.id));
									const labelId = `enhanced-table-checkbox-${index}`;
									return (
										<TableRow hover onClick={(event) => handleClick(event, Number(row.id))} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected} sx={{ cursor: 'pointer' }}>
											<TableCell padding="checkbox"> <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /> </TableCell>
											<TableCell component="th" id={labelId} scope="row" padding="none"> { row.title } </TableCell>
											<TableCell align="right">{row.calories}</TableCell>
											<TableCell align="right">{row.fat}</TableCell>
											<TableCell align="right">{row.carbs}</TableCell>
											<TableCell align="right">{row.protein}</TableCell>
										</TableRow>
									);
								})
							}
							{ emptyRows > 0 && <TableRow style={{ height: 53 * emptyRows }}> <TableCell colSpan={6} /> </TableRow> }
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination rowsPerPageOptions={[5, 10, 25, 50, 75, 100]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
			</Paper>
			<Snackbar TransitionComponent={Slide} open={getSnackbarState} autoHideDuration={6000} onClose={() => setSnackbarState(!getSnackbarState)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
				<Alert onClose={() => setSnackbarState(!getSnackbarState)} severity='error' variant='filled' className={`w-full`}>
					Please Select row/s to Delete...!
				</Alert>
			</Snackbar>
		</Box>
	);
}