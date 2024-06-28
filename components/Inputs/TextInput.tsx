import dayjs from 'dayjs';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField, InputAdornment, Tooltip, Zoom } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export function TextInput({ getValue, handleChange, id, name, placeholder, label, component, icon, disabled }: any) {

	const tomorrow = new Date((new Date()).valueOf() + 1000*3600*24);

	return (
			component === 'text'
			?	<>
					{
						disabled === true
						?
							<Tooltip title={'This will be Filled Automatically...!'} placement="right" TransitionComponent={Zoom} followCursor>
								<TextField disabled={disabled} onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start"> {icon} </InputAdornment> }} />
							</Tooltip>
						:
							<TextField onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start"> {icon} </InputAdornment> }} />
					}
				</>
			:
				component === 'textArea'
				?
					<TextField onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} multiline rows={10} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start" > {icon} </InputAdornment> }} />
				:
					component === 'date1'
					?
						// (<TextField onChange={handleChange} value={getValue} color='error' fullWidth required type={component} id={id} name={name} label={label} />
						<TextField onChange={handleChange} value={getValue} color='error' fullWidth required type={component} id={id} name={name} label={label} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start"> {icon} </InputAdornment> }} />
					:
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={['MobileDatePicker']}>
								<DemoItem label={label}>
									<StaticDatePicker minDate={dayjs(tomorrow)} onChange={handleChange} defaultValue={dayjs(new Date())} />
								</DemoItem>
							</DemoContainer>
						</LocalizationProvider>
	)
}
