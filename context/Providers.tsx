'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: any) {

	return (
		<ThemeProvider attribute='class'>
			{ children }
		</ThemeProvider>
	)

}
