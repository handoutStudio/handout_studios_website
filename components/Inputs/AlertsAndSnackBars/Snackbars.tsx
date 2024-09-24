import * as React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

export const Snackbars = ({ getOpen, getApiResponse }: any) => {

	return (
		<Snackbar open={getOpen} autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal:'center' }}>

			<Alert variant="filled" severity={ getApiResponse.color.toLocaleLowerCase() === "success" ? "success" : getApiResponse.color.toLocaleLowerCase() === "warning" ? "warning" : "error" }>
				<AlertTitle>{getApiResponse.color}</AlertTitle>
				{getApiResponse.message}
			</Alert>

		</Snackbar>
	)
}