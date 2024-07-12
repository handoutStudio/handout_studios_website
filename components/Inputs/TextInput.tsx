import dayjs from 'dayjs';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CurrencyRupeeRounded, DescriptionRounded } from '@mui/icons-material';
import { TextField, InputAdornment, Tooltip, Zoom, MenuItem, Select, InputLabel, OutlinedInput, FormControl, Switch, FormControlLabel } from '@mui/material';


// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
	interface Palette {
		handout: Palette['primary'];
	}
  
	interface PaletteOptions {
		handout?: PaletteOptions['primary'];
	}
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
	  ochre: true;
	}
}
  
const theme = createTheme({
	palette: {
		handout: {
			main: '#7C0107',
			light: '#7C0107',
			dark: '#7C0107',
			contrastText: '#FFFFFF',
		},
	},
});

export function TextInput({ getValue, handleChange, id, name, placeholder, label, component, icon, disabled, rows, maxRows, type, selectMenu, minDate }: any) {

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
								minDate
								?
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['MobileDatePicker']}>
											<DemoItem label={label}>
												<StaticDatePicker minDate={dayjs(tomorrow)} onChange={handleChange} defaultValue={dayjs(new Date())} orientation="landscape" sx={{ '.MuiPickersToolbar-root': { color: '#7C0107', borderRadius: '20px', backgroundColor: '#FFFFFF' } }} />
											</DemoItem>
										</DemoContainer>
									</LocalizationProvider>
								:
									// <LocalizationProvider dateAdapter={AdapterDayjs}>
									// 	<DemoContainer sx={{ width: '100%' }} components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}>
									// 		<DatePicker defaultValue={dayjs(new Date())} onChange={handleChange} />
									// 	</DemoContainer>
									// </LocalizationProvider>

									<ThemeProvider theme={theme}>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer sx={{ width: '100%' }} components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}>
												<DatePicker sx={{ width: '100%' }} label={label} defaultValue={dayjs(new Date())} onChange={handleChange} slotProps={{ openPickerButton: { color: 'handout' }, textField: { color: 'error' } }} />
											</DemoContainer>
										</LocalizationProvider>
									</ThemeProvider>

									// <LocalizationProvider dateAdapter={AdapterDayjs}>
									// 	<DemoContainer components={['DatePicker']}>
									// 		<DemoItem label={label}>
									// 			<StaticDatePicker onChange={handleChange} defaultValue={dayjs(new Date())} />
									// 		</DemoItem>
									// 	</DemoContainer>
									// </LocalizationProvider>
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
										component === 'switch'
										?
											<FormControlLabel
												value={getValue}
												id={id}
												name={name}
												control={<Switch checked={getValue} id={id} name={name} color='error' onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />}
												label={label}
												labelPlacement="start"
											/>
										:
											null
	)
}
