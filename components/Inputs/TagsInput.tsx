import * as React from "react";
import { useTheme } from 'next-themes';
import { MuiChipsInput } from 'mui-chips-input';

export const TagsInput = ({ handleChangeTags, getValue, setValue }: any) => {

	const { theme } = useTheme();

	return (
		<MuiChipsInput
			helperText={getValue.length > 0 ? "Double click to edit a chip" : ""}
			clearInputOnBlur
			value={getValue}
			onChange={handleChangeTags}
			className={`w-[100%] `}
			color='error'
			sx={{ '.MuiChip-root': { backgroundColor: `${theme === 'light' ? '#7c0104' : '#AF0106'}`, color: 'white' }, '.MuiChip-deleteIcon': { color: 'white' } }}
		/>
	);
}