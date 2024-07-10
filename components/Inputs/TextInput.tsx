import dayjs from 'dayjs';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CurrencyRupeeRounded, DescriptionRounded } from '@mui/icons-material';
import { TextField, InputAdornment, Tooltip, Zoom, MenuItem, Select, InputLabel, OutlinedInput, FormControl } from '@mui/material';

export function TextInput({ getValue, handleChange, id, name, placeholder, label, component, icon, disabled, rows, maxRows, type, selectMenu }: any) {

	const tomorrow = new Date((new Date()).valueOf() + 1000*3600*24);

	return (
			component === 'text'
			?
				disabled === true
				?
					<Tooltip title={'This will be Filled Automatically...!'} placement="right" TransitionComponent={Zoom} followCursor>
						<TextField type={type} disabled={disabled} onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start"> {icon} </InputAdornment> }} />
					</Tooltip>
				:
					<TextField type={type} onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start"> {icon} </InputAdornment> }} />
			:
				component === 'number'
				?
					<TextField type={type} onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start"> {icon} </InputAdornment>, inputProps: { min: 1, step: 1 } }} />
				:
					component === 'currency'
					?
						<TextField type={type} onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start"> { icon ? icon : <CurrencyRupeeRounded /> } </InputAdornment>, inputProps: { min: 0.01, step: 1.0 } }} />
					:
						component === 'textArea'
						?
							maxRows
							?
								<TextField onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} multiline maxRows={maxRows ? maxRows : 10} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start" > { icon ? icon : <DescriptionRounded /> } </InputAdornment> }} />
							:
								<TextField onChange={handleChange} value={getValue} color='error' fullWidth required id={id} name={name} label={label} multiline rows={rows ? rows : 10} placeholder={placeholder} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start" > { icon ? icon : <DescriptionRounded /> } </InputAdornment> }} />
						:
							component === 'date'
							?
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={['MobileDatePicker']}>
										<DemoItem label={label}>
											<StaticDatePicker minDate={dayjs(tomorrow)} onChange={handleChange} defaultValue={dayjs(new Date())} />
										</DemoItem>
									</DemoContainer>
								</LocalizationProvider>
							:
								component === 'select'
								?
									<TextField select fullWidth id={id} name={name} color='error' value={getValue ?? ""} label={label} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment sx={{ color: '#7c0107' }} position="start" > {icon} </InputAdornment> }}>
										{
											selectMenu.map((items: any, index: number) => (
												<MenuItem key={index} value={items}>
													{items}
												</MenuItem>
											))
										}
									</TextField>
								:
									component === 'selectMulti'
									?
										<FormControl sx={{ width: '100%' }}>
											<InputLabel id={id}>{label}</InputLabel>
											<Select labelId={id} id={id} fullWidth name={name} label={label} multiple value={getValue} onChange={handleChange} input={<OutlinedInput label={label} />} color='error'>
											{
												selectMenu.map((items: any, index: number) => (
													<MenuItem key={index} value={items}>
														{items}
													</MenuItem>
												))
											}
											</Select>
										</FormControl>
									:
										null
	)
}
