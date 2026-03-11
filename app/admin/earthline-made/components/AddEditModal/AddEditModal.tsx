'use client'

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Masonry from "@mui/lab/Masonry";
import { motion } from "framer-motion";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef, DragEvent, ChangeEvent, useState, Dispatch, SetStateAction } from "react";

type Props = {
	open: boolean;
	handleClose: () => void;

	getLoader: boolean;

	productName: string;
	setProductName: (v: string) => void;

	productDescription: string;
	setProductDescription: (v: string) => void;

	folderName: string;
	setFolderName: (v: string) => void;

	folderOptions: string[];
	setCreateFolderOpen: (v: boolean) => void;

	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;

	previews: string[];
	setPreviews: Dispatch<SetStateAction<string[]>>;

	uploadProgress: number[];

	handleSubmitProduct: () => void;
}

export default function AddEditModal({ open, handleClose, getLoader, productName, setProductName, productDescription, setProductDescription, folderName, setFolderName, folderOptions, setCreateFolderOpen, files, setFiles, previews, setPreviews, uploadProgress, handleSubmitProduct }: Props) {

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [dragActive, setDragActive] = useState(false);

    const handleFiles = (selectedFiles: FileList | null) => {
        if (!selectedFiles) return

        const newFiles = Array.from(selectedFiles)

        setFiles((prev) => [...prev, ...newFiles])

        const newPreviews = newFiles.map(file => URL.createObjectURL(file))
        setPreviews((prev) => [...prev, ...newPreviews])
    }

	const handleDrop = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragActive(true); }

	const handleDragLeave = () => setDragActive(false);

	const handleClickUpload = () => fileInputRef.current?.click();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);

	const removeFile = (index: number) => { setPreviews((prev) => prev.filter((_, i) => i !== index)); setFiles((prev) => { if (index >= prev.length) return prev; return prev.filter((_, i) => i !== index); }); };

	return (
		<Modal open={open} onClose={handleClose}>
			{/* <Card sx={{ position: "absolute", top: { xs: "50%", md: "50%" }, left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: "90%", md: "80%", lg: "60%", xl: "50%" }, maxHeight: { xs: "92vh", md: "90vh" }, borderRadius: 3, display: "flex", flexDirection: "column" }}> */}
			<Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "94%", sm: "88%", md: "72%", lg: "58%", xl: "46%" }, maxHeight: "92vh", borderRadius: 3, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", background: "#F8F6F4" }}>

				<Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={getLoader}>
					<CircularProgress color="inherit" />
				</Backdrop>

				<CardHeader title={productName ? "Edit Product" : "Add New Product"} sx={{ textAlign: "center", borderBottom: "1px solid rgba(0,0,0,0.08)", py: { xs: 2, md: 2.5 }, "& .MuiCardHeader-title": { fontSize: { xs: "18px", md: "22px" }, fontWeight: 600, color: "#564F47" } }} />

				{/* <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3, overflowY: "auto", maxHeight: "70vh", pr: 1 }}> */}
				<CardContent sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 3 }, overflowY: "auto", px: { xs: 2.5, md: 4 }, py: { xs: 2.5, md: 3 }, flex: 1 }}>

					<TextField sx={{ "& label": { color: "#564F47" }, "& label.Mui-focused": { color: "#564F47" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#564F47" }, "&:hover fieldset": { borderColor: "#564F47" }, "&.Mui-focused fieldset": { borderColor: "#564F47" } } }} select fullWidth value={folderName} label="Select Folder" onChange={(e) => { const value = e.target.value; value === "__create__" ? setCreateFolderOpen(true) : setFolderName(value); }}>
						{ folderOptions.map((folder) => ( <MenuItem key={folder} value={folder}> {folder} </MenuItem> )) }
						<Divider />
						<MenuItem value="__create__"> {`+ Create New Folder`} </MenuItem>
					</TextField>
                    <TextField sx={{ "& label": { color: "#564F47" }, "& label.Mui-focused": { color: "#564F47" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#564F47" }, "&:hover fieldset": { borderColor: "#564F47" }, "&.Mui-focused fieldset": { borderColor: "#564F47" } } }} fullWidth label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <TextField sx={{ "& label": { color: "#564F47" }, "& label.Mui-focused": { color: "#564F47" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#564F47" }, "&:hover fieldset": { borderColor: "#564F47" }, "&.Mui-focused fieldset": { borderColor: "#564F47" } } }} fullWidth label="Product Description" multiline rows={3} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />

					<Box onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={handleClickUpload} sx={{ border: "2px dashed #564F47", backgroundColor: dragActive ? "#564F4715" : "#564F4708", padding: { xs: 2.5, sm: 3, md: 4 }, textAlign: "center", borderRadius: 2, cursor: "pointer", transition: "all .25s ease", "&:hover": { backgroundColor: "#564F4715" } }}>
						{/* <Typography>Drag & Drop Images Here</Typography>
						<Typography variant="caption"> {`or click to upload`} </Typography> */}
						<Typography sx={{ fontWeight: 500, color: "#564F47" }}> {`Drag & Drop Images Here`} </Typography>
						<Typography variant="caption" sx={{ opacity: 0.7 }}> {`or click to upload`} </Typography>
						<input ref={fileInputRef} type="file" hidden multiple accept="image/*,video/*" onChange={handleChange} />
					</Box>
					{
						previews.length > 0 && (
							<Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={1.5}>
								{
									previews.map((preview, index) => (
									<motion.div key={index} style={{ position: "relative", overflow: "hidden", borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.15)", }}>
										<img src={preview} style={{ width: "100%", height: "auto", objectFit: "cover", display: "block", }} />
										<IconButton onClick={() => removeFile(index)} sx={{ position: "absolute", top: 8, right: 8, backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", color: "#fff", "&:hover": { backgroundColor: "#7a0007" }, }}>
											<DeleteIcon fontSize="small" />
										</IconButton>
										{
											uploadProgress[index] !== undefined &&
												<Box className="absolute bottom-0 left-0 w-full bg-black/60 p-2">
													<Box sx={{ width: `${uploadProgress[index]}%`, height: "6px", backgroundColor: "#4caf50", }} />
												</Box>
										}
									</motion.div>
									))
								}
							</Masonry>
						)
					}
				</CardContent>
				<CardActions sx={{ justifyContent: "flex-end", gap: 2, flexWrap: "wrap", px: 3, pb: 2 }}>
					<Button variant="contained" sx={{ backgroundColor: "#EDE8E4", color: "#564F47" }} onClick={handleClose}> {`Close`} </Button>
					<Button variant="contained" sx={{ backgroundColor: "#564F47", color: "#EDE8E4" }} onClick={handleSubmitProduct}> {`Submit`} </Button>
				</CardActions>
			</Card>
		</Modal>
	)
}