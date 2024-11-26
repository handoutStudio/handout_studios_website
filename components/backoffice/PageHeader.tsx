import * as XLSX from 'xlsx';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@mui/material';
import Heading from '@/components/backoffice/Heading';
import { AddCircleRounded, CloudDownloadRounded, CloudUploadRounded } from '@mui/icons-material';

export function PageHeader({pageTitle, link, buttonText, dataRows, workSheetName, XLSXName}: any) {

	const handleExport = () => {
		try {
			// Check if the action result contains data and if it's an array
			if (dataRows && Array.isArray(dataRows)) {
				const dataToExport = dataRows.map((items: any) => ( items ));
				// Create Excel workbook and worksheet
				const workbook = XLSX.utils.book_new();
				const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
				XLSX.utils.book_append_sheet(workbook, worksheet, workSheetName);
				// Save the workbook as an Excel file
				XLSX.writeFile(workbook, `${XLSXName}.xlsx`);
				console.log(`Exported data to ${XLSXName}.xlsx`);
			}
			else console.log("#==================Export Error")
		}
		catch (error: any) { console.log("#==================Export Error ", error.message); }
	}

	return (
		<div className={`flex justify-between items-center py-3 px-5 w-full rounded-lg !bg-red-300 max-[600px]:flex-col`}>
			<div className={`flex justify-center items-center gap-5`}>
				<Heading title={ pageTitle } />
			</div>
			<div className={`flex justify-center items-center gap-5 max-[470px]:flex-col min-[471px]:flex-row`}>
				{
					buttonText !== null &&
					<>
						{/* <Button variant="contained" className={`dark:bg-red-500 bg-red-700 hover:bg-red-600`} startIcon={<CloudDownloadRounded />}> Import </Button> */}
						<Button variant="contained" onClick={handleExport} className={`!bg-[#7c0104] hover:!bg-red-700`} startIcon={<CloudUploadRounded />}> Export </Button>
						{
							link !== null && (
								<Link href={ link }>
									<Button variant="contained" className={`!bg-[#7c0104] hover:!bg-red-700`} startIcon={<AddCircleRounded />}>{buttonText}</Button>
								</Link>
							)
						}
					</>
				}
			</div>
		</div>
	)
}
