import * as React from 'react';
import { Alert } from '@mui/material';


export const Alerts = ({ getError, alertMessage, setError }: any) => {

	setTimeout(() => {
		setError(false);
	}, 5000);

	return <Alert className={`${getError ? '' : 'invisible hidden'} w-full`} variant="filled" severity="error">{alertMessage}</Alert>
}