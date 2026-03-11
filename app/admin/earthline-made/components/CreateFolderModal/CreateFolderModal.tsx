'use client'

import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = { open: boolean; onClose: () => void; newFolderName: string; setNewFolderName: (v: string) => void; folderError: string; setFolderError: (v: string) => void; handleCreateFolder: () => void; }

export default function CreateFolderModal({ open, onClose, newFolderName, setNewFolderName, folderError, setFolderError, handleCreateFolder }: Props) {

	return (
		<Modal open={open} onClose={onClose}>
			<Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 flex flex-col gap-6">
				<Typography variant="h6"> {`Create New Folder`} </Typography>
				<TextField autoFocus sx={{ "& label": { color: "#564F47" }, "& label.Mui-focused": { color: "#564F47" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#564F47" }, "&:hover fieldset": { borderColor: "#564F47" }, "&.Mui-focused fieldset": { borderColor: "#564F47" } } }} fullWidth label="Folder Name" value={newFolderName} error={!!folderError} helperText={folderError} onChange={(e) => { setNewFolderName(e.target.value); setFolderError(""); }} />
				<div className="flex justify-end gap-4">
					<Button sx={{ backgroundColor: "#EDE8E4", color: "#564F47" }} variant="contained" onClick={onClose}> {`Cancel`} </Button>
					<Button sx={{ backgroundColor: "#564F47", color: "#EDE8E4" }} variant="contained" onClick={handleCreateFolder}> {`Create`} </Button>
				</div>
			</Card>
		</Modal>
	)
}