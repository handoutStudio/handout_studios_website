import Downshift from "downshift";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Chip, TextField } from "@mui/material";

export interface TagsInputProps {
	selectedTags: (tags: string[]) => void;
	placeholder?: string;
	tags?: string[];
}

export default function TagsInput({ selectedTags, placeholder, tags = [], ...other }: TagsInputProps) {
	const [inputValue, setInputValue] = React.useState<string>("");
	const [selectedItem, setSelectedItem] = React.useState<string[]>([]);
  
	useEffect(() => { setSelectedItem(tags); }, [tags]);
  
	useEffect(() => { selectedTags(selectedItem); }, [selectedItem, selectedTags]);
  
	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			const newSelectedItem = [...selectedItem];
			const duplicatedValues = newSelectedItem.indexOf(inputValue.trim());
		
			if (duplicatedValues !== -1) {
				setInputValue("");
				return;
			}
		
			if (!inputValue.trim()) return;
		
			newSelectedItem.push(inputValue.trim());
			setSelectedItem(newSelectedItem);
			setInputValue("");
		}
		
		if (selectedItem.length && !inputValue.length && event.key === "Backspace") {
			setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
		}
	}
	
	function handleChange(item: string | null) {
		if (item && !selectedItem.includes(item)) {
			setSelectedItem([...selectedItem, item]);
		}
		setInputValue("");
	}
	
	const handleDelete = (item: string) => () => {
		const newSelectedItem = selectedItem.filter((selected) => selected !== item);
		setSelectedItem(newSelectedItem);
	};
  
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value);
	}
  
	return (
		
		<Downshift id="downshift-multiple" inputValue={inputValue} onChange={handleChange} selectedItem={null}>
		{
			({ getInputProps }) => { const { onBlur, onChange, ...inputProps } = getInputProps({ onKeyDown: handleKeyDown, placeholder });
				return (
					<div className="w-full flex">
						<TextField
							InputProps={{
								startAdornment: selectedItem.map((item) => ( <Chip key={item} color="error" tabIndex={-1} label={`# ${item}`} className={`m-2`} onDelete={handleDelete(item)} /> )),
								onBlur,
								onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
									handleInputChange(event);
									onChange?.(event);
								},
							}}
							color="error"
							label={`Tags`}
							fullWidth
							{...other}
							{...inputProps}
						/>
					</div>
				);
			}
		}
		</Downshift>
	);
}
  
TagsInput.defaultProps = { tags: [], placeholder: "Enter tags" };
  
TagsInput.propTypes = { selectedTags: PropTypes.func.isRequired, tags: PropTypes.arrayOf(PropTypes.string), placeholder: PropTypes.string };