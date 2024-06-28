'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

export default function ThemeSwitcher() {

	const { theme, setTheme } = useTheme();
	const [getMounted, setMounted] = React.useState(false);

	React.useLayoutEffect(() => {
		setMounted(true);
	}, []);

	if(!getMounted) return null;
	
	return (
		<button className={`w-fit p-2 rounded-md hover:scale-100 active:scale-50 duration-200 text-white`} onClick={ () => setTheme(theme === "dark" ? "light" : "dark") }>
			<Tooltip title={ theme === 'light' ? 'I was born in Darkness...!' : 'Let there be Light...!' }>
				{ theme === "light" ? <DarkMode fontSize='large' className={`max-[600px]:text-xl`} /> : <LightMode fontSize='large' className={`max-[600px]:text-xl`} /> }
			</Tooltip>
		</button>
	)
}
