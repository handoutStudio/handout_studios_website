"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";

interface Message {
	id: string;
	name: string;
	email: string;
	phone?: string;
	subject?: string;
	message: string;
	brand: string;
	isRead: boolean;
	createdAt: string;
}

export default function Homes() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState<Message | null>(null);
	const [loading, setLoading] = useState(true);

	async function fetchMessages() {
		setLoading(true);
		const res = await fetch("/api/contact-us/all");
		const data = await res.json();
		setMessages(data.data || []);
		setLoading(false);
	}

	useEffect(() => {
		fetchMessages();
	}, []);

	const handleSelectAll = (checked: boolean) => {
		setSelected(checked ? messages.map((m) => m.id) : []);
	};

	const handleSelect = (id: string) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	};

	const markAsRead = async (ids: string[]) => {
		await fetch("/api/contact-us/mark-read", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids }),
		});
		fetchMessages();
		setSelected([]);
	};

	const markAsUnread = async (ids: string[]) => {
		await fetch("/api/contact-us/mark-unread", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids }),
		});
		fetchMessages();
		setSelected([]);
	};

	const deleteMessages = async (ids: string[]) => {
		await fetch("/api/contact-us/delete", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids }),
		});
		fetchMessages();
		setSelected([]);
		setOpen(false);
	};

	const handleRowClick = (msg: Message) => {
		setCurrent(msg);
		setOpen(true);
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: "#EDE8E4",
				color: "#564F47",
				p: 4,
			}}
		>
			<Typography variant="h4" mb={3} fontWeight={600}>
				Contact Messages
			</Typography>

			{selected.length > 0 && (
				<Stack direction="row" spacing={2} mb={2}>
					<Button
						variant="contained"
						onClick={() => markAsRead(selected)}
						sx={{ backgroundColor: "#564F47" }}
					>
						Mark Read
					</Button>

					<Button
						variant="outlined"
						onClick={() => markAsUnread(selected)}
						sx={{ borderColor: "#564F47", color: "#564F47" }}
					>
						Mark Unread
					</Button>

					<Button
						color="error"
						variant="contained"
						onClick={() => deleteMessages(selected)}
					>
						Delete
					</Button>
				</Stack>
			)}

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#f5f1ed" }}>
							<TableCell padding="checkbox">
								<Checkbox
									checked={
										selected.length === messages.length && messages.length > 0
									}
									onChange={(e) => handleSelectAll(e.target.checked)}
								/>
							</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan={4} align="center">
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : (
							messages.map((msg) => (
								<TableRow
									key={msg.id}
									hover
									onClick={() => handleRowClick(msg)}
									sx={{
										cursor: "pointer",
										backgroundColor: msg.isRead ? "inherit" : "#fff9f3",
									}}
								>
									<TableCell
										padding="checkbox"
										onClick={(e) => e.stopPropagation()}
									>
										<Checkbox
											checked={selected.includes(msg.id)}
											onChange={() => handleSelect(msg.id)}
										/>
									</TableCell>

									<TableCell>{msg.name}</TableCell>
									<TableCell>{msg.email}</TableCell>
									<TableCell>
										<Chip
											label={msg.isRead ? "Read" : "Unread"}
											size="small"
											sx={{
												backgroundColor: msg.isRead ? "#d7ccc8" : "#564F47",
												color: msg.isRead ? "#564F47" : "#fff",
											}}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* MODAL */}
			<Modal open={open} onClose={() => setOpen(false)}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: { xs: "90%", md: 600 },
						bgcolor: "white",
						p: 4,
						borderRadius: 3,
						boxShadow: 24,
					}}
				>
					{current && (
						<>
							<Typography variant="h6" mb={2}>
								{current.subject || "No Subject"}
							</Typography>

							<Typography mb={1}>
								<strong>Name:</strong> {current.name}
							</Typography>

							<Typography mb={1}>
								<strong>Email:</strong> {current.email}
							</Typography>

							<Typography mt={2}>{current.message}</Typography>

							<Stack direction="row" spacing={2} mt={4}>
								<Button
									variant="outlined"
									onClick={() => markAsUnread([current.id])}
								>
									Mark Unread
								</Button>

								<Button
									color="error"
									variant="contained"
									onClick={() => deleteMessages([current.id])}
								>
									Delete
								</Button>

								<Button
									variant="contained"
									sx={{
										backgroundColor: "#564F47",
									}}
									onClick={() => setOpen(false)}
								>
									Close
								</Button>
							</Stack>
						</>
					)}
				</Box>
			</Modal>
		</Box>
	);
}
