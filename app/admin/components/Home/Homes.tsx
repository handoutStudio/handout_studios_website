"use client";

import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputAdornment from "@mui/material/InputAdornment";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";


interface Message { id: string; name: string; email: string; phone?: string; subject?: string; message: string; brand: string; isRead: boolean; createdAt: string; isDeleted: boolean; }

export default function Homes() {

	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [selected, setSelected] = useState<string[]>([]);
	const [messages, setMessages] = useState<Message[]>([]);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));
	const [current, setCurrent] = useState<Message | null>(null);
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
	const selectedItems = selected.length > 0 ? ` ${selected.length} ${selected.length === 1 ? " Item" : " Items"}` : '';

	// For sorting and searching
	const [generalSearch, setGeneralSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [columnSearch, setColumnSearch] = useState({ name: "", email: "" });
	const [sortConfig, setSortConfig] = useState<{ key: keyof Message | null; direction: "asc" | "desc"; }>({ key: "createdAt", direction: "desc", });

	// Processed Messages for Filtering + sorting logic
	const processedMessages = messages
		.filter((msg) => {
			if (!debouncedSearch) return true;
			const search = debouncedSearch.toLowerCase();
			return (
					msg.name.toLowerCase().includes(search)
				||
					msg.email.toLowerCase().includes(search)
				||
					(msg.subject ?? "").toLowerCase().includes(search)
				||
					msg.message.toLowerCase().includes(search)
			);
		})
		.sort((a, b) => {
			if (!sortConfig.key) return 0;
			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];
			if (aValue === undefined || bValue === undefined) return 0;
			if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
			if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
			return 0;
		});

	// Keyboard Navigations
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
	// Paginated Messages
	const paginatedMessages = processedMessages.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage );
	// Unread Count
	const unreadCount = messages.filter((m) => !m.isRead).length;

	// Keyboard Listner
	useEffect(() => {

		function handleKey(e: KeyboardEvent) {

			if (!paginatedMessages.length) return;

			if (e.key === "ArrowDown") {
				setFocusedIndex((prev) =>
					prev === null
						? 0
						: Math.min(prev + 1, paginatedMessages.length - 1)
				);
			}

			if (e.key === "ArrowUp") {
				setFocusedIndex((prev) =>
					prev === null
						? 0
						: Math.max(prev - 1, 0)
				);
			}

			if (e.key === "Enter" && focusedIndex !== null) {
				handleRowClick(paginatedMessages[focusedIndex]);
			}
		}

		window.addEventListener("keydown", handleKey);

		return () => window.removeEventListener("keydown", handleKey);

	}, [focusedIndex, paginatedMessages]);


	async function fetchMessages() {
		setLoading(true);
		const res = await fetch("/api/contact-us/all");
		const data = await res.json();
		setMessages(data.data || []);
		setLoading(false);
	}

	useEffect(() => { fetchMessages(); }, []);

	const handleSelectAll = (checked: boolean) => {
		if (checked) { const newIds = paginatedMessages.map((m) => m.id); setSelected((prev) => Array.from(new Set([...prev, ...newIds]))); }
		else { const visibleIds = paginatedMessages.map((m) => m.id); setSelected((prev) => prev.filter((id) => !visibleIds.includes(id))); }
	};

	const handleSelect = (id: string) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id] );

	const markAsRead = async (ids: string[]) => {
		await fetch("/api/contact-us/mark-read", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }), });
		fetchMessages();
		setSelected([]);
	};

	const markAsUnread = async (ids: string[]) => {
		await fetch("/api/contact-us/mark-unread", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }), });
		fetchMessages();
		setSelected([]);
		setOpen(false);
	};

	const deleteMessages = async (ids: string[]) => {
		await fetch("/api/contact-us/delete", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }), });
		fetchMessages();
		setSelected([]);
		setOpen(false);
	};

	const handleRowClick = (msg: Message) => { setCurrent(msg); setOpen(true); markAsRead([msg.id]); };

	const openMenu = (event: React.MouseEvent<HTMLElement>) => { setMenuAnchor(event.currentTarget); };

	const closeMenu = () => setMenuAnchor(null);


	// Sorting Function
	function handleSort(key: keyof Message) {
		let direction: "asc" | "desc" = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
		setSortConfig({ key, direction });
	}

	// Debounce Searching
	useEffect(() => {
		const timer = setTimeout(() => { setDebouncedSearch(generalSearch); }, 300);
		return () => clearTimeout(timer);
	}, [generalSearch]);

	return (
		<Box sx={{ minHeight: "100vh", backgroundColor: "#EDE8E4", color: "#564F47", py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 }, }}>

			{/* HEADER */}
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>

				<Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center">
					<Badge badgeContent={unreadCount} color="error">
						<Typography variant={isMobile ? "h6" : "h4"} fontWeight={600}> {`Contact Inbox`} </Typography>
					</Badge>
					<TextField size="small" placeholder="Search messages..." value={generalSearch} onChange={(e) => setGeneralSearch(e.target.value)} sx={{ width: isMobile ? 180 : 280, background: "#fff", borderRadius: 2 }} InputProps={{ startAdornment: ( <InputAdornment position="start"> <SearchIcon /> </InputAdornment> ) }} />
				</Stack>
				{
					!isTablet
					?
						<Button endIcon={<MoreVertIcon />} onClick={openMenu} variant="contained" sx={{ backgroundColor: "#564F47" }}> {`More Actions`} </Button>
					:
						<IconButton onClick={openMenu}> <MoreVertIcon /> </IconButton>
				}
				<Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
					<MenuItem onClick={() => { markAsRead(selected); closeMenu(); }} className={`bg-[#EDE8E4]! text-[#564F47]! hover:bg-[#564F47]! hover:text-[#EDE8E4]!`}>
						<MarkEmailReadIcon sx={{ mr: 1 }} /> {`Mark Read`}
					</MenuItem>
					<MenuItem onClick={() => { markAsUnread(selected); closeMenu(); }} className={`bg-[#EDE8E4]! text-[#564F47]! hover:bg-[#564F47]! hover:text-[#EDE8E4]!`}>
						<MarkEmailUnreadIcon sx={{ mr: 1 }} /> {`Mark Unread`}
					</MenuItem>
					<MenuItem onClick={() => { deleteMessages(selected); closeMenu(); }} className={`bg-[#EDE8E4]! text-[#7A0007]! hover:bg-[#7A0007]! hover:text-[#EDE8E4]!`}>
						<DeleteIcon sx={{ mr: 1 }} /> {`Delete`}
					</MenuItem>
				</Menu>
			</Stack>
			<TableContainer component={Paper} sx={{ overflowX: "auto" }}>
				<Table size={isMobile ? "small" : "medium"} stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox" className={`sticky! left-0! z-3! ${paginatedMessages[0]?.brand === "EARTHLINE_MADE" ? "bg-[#564F47]!" : "bg-[#7A0007]!"}`}>
								<Checkbox className={`text-[#EDE8E4]!`} checked={ paginatedMessages.length > 0 && paginatedMessages.every((msg) => selected.includes(msg.id)) } indeterminate={ paginatedMessages.some((msg) => selected.includes(msg.id)) && !paginatedMessages.every((msg) => selected.includes(msg.id)) } onChange={(e) => handleSelectAll(e.target.checked)} />
							</TableCell>
							<TableCell className={`${isMobile ? "text-[12px]!" : ""}`}>
								<TableSortLabel active={sortConfig.key === "name"} direction={sortConfig.direction} onClick={() => handleSort("name")}> {`Name`} </TableSortLabel>
							</TableCell>
							<TableCell className={`${isMobile ? "text-[12px]!" : ""}`}>Email</TableCell>
							<TableCell className={`${isMobile ? "text-[12px]!" : ""}`}>
								<TableSortLabel active={sortConfig.key === "createdAt"} direction={sortConfig.direction} onClick={() => handleSort("createdAt")}> {`Date`} </TableSortLabel>
							</TableCell>
							<TableCell className={`${isMobile ? "text-[12px]!" : ""}`}>
								<TableSortLabel active={sortConfig.key === "isRead"} direction={sortConfig.direction} onClick={() => handleSort("isRead")}> {`Status`} </TableSortLabel>
							</TableCell>
							<TableCell align="center" className={`${isMobile ? "text-[12px]!" : ""}`}> {`Actions`} </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							loading
							?
								(
									<TableRow>
										<TableCell colSpan={5} align="center">
											<CircularProgress />
										</TableCell>
									</TableRow>
								)
							:
								(
									paginatedMessages.map((msg, index) => (
										<TableRow key={msg.id} hover sx={{ cursor: "pointer", backgroundColor: index === focusedIndex ? "#e3f2fd" : msg.isRead ? "inherit" : msg.brand === "EARTHLINE_MADE" ? "#564F473A" : "#7A00073F", fontWeight: msg.isRead ? 400 : 600, }}>
											<TableCell padding="checkbox" onClick={(e) => e.stopPropagation()} className={`sticky! left-0! z-3! ${msg.brand === "EARTHLINE_MADE" ? "bg-[#564F47]!" : "bg-[#7A0007]!"}`}>
												<Checkbox checked={selected.includes(msg.id)} onChange={() => handleSelect(msg.id)} className={`text-[#EDE8E4]!`} />
											</TableCell>
											<Tooltip placement="right" title={ <Typography fontWeight={600}> {`Message: ${msg.message}`} </Typography> } arrow followCursor>
												<TableCell onClick={() => handleRowClick(msg)} className={`text-[#564F47]! ${isMobile ? "text-[12px]!" : ""}`}> {msg.name} </TableCell>
											</Tooltip>
											<TableCell onClick={() => handleRowClick(msg)} className={`text-[#564F47]! ${isMobile ? "text-[12px]!" : ""}`}> {msg.email} </TableCell>
											<TableCell onClick={() => handleRowClick(msg)} className={`text-[#564F47]! ${isMobile ? "text-[12px]!" : ""}`}> {dayjs(msg.createdAt).format("DD MMM YYYY")} </TableCell>
											<TableCell onClick={() => handleRowClick(msg)} className={`text-[#564F47]!`}>
												<Chip label={msg.isRead ? "Closed" : "Open"} size="small" className={`${msg.isRead ? msg.brand === "EARTHLINE_MADE" ? "bg-[#EDE8E4]! text-[#564F47]!" : "bg-[#EDE8E4]! text-[#7A0007]!" : msg.brand === "EARTHLINE_MADE" ? "bg-[#564F47]! text-[#EDE8E4]!" : "bg-[#7A0007]! text-[#EDE8E4]!"} text-[2D333A]! ${isMobile ? "text-[12px]!" : ""}`} />
											</TableCell>
											<TableCell align="center" onClick={(e) => e.stopPropagation()}>
												<Stack direction="row" spacing={1} justifyContent="center">
													<Tooltip title={ msg.isRead ? "Mark Unread" : "Mark Read" }>
														<IconButton size="small" onClick={() => msg.isRead ? markAsUnread([msg.id]) : markAsRead([msg.id]) } className={`bg-[#EDE8E4]! text-[#564F47]! hover:bg-[#564F47]! hover:text-[#EDE8E4]!`}> { msg.isRead ? <MarkEmailUnreadIcon fontSize="small" /> : <MarkEmailReadIcon fontSize="small" /> } </IconButton>
													</Tooltip>
													<Tooltip title="Delete">
														<IconButton size="small" onClick={() => deleteMessages([msg.id]) } className={`bg-[#FFFFFF]! text-[#7a0007]! hover:bg-[#7a0007]! hover:text-[#FFFFFF]! `}>
															<DeleteIcon fontSize="small" />
														</IconButton>
													</Tooltip>
												</Stack>
											</TableCell>
										</TableRow>
									))
								)
						}
					</TableBody>
				</Table>
			</TableContainer>
			<Paper sx={{ display: "flex", justifyContent: "flex-end", gap: 2, }}>
				<TablePagination component="div" count={processedMessages.length} page={page} onPageChange={(event, newPage) => setPage(newPage)} rowsPerPage={rowsPerPage} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} rowsPerPageOptions={[10, 20, 50, 100]} sx={{ display: "flex", justifyContent: "flex-end", }} />
			</Paper>

			{/* MESSAGE MODAL */}
			<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition slotProps={{ backdrop: { sx: { backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.45)", }, }, }}>
				<Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", sm: "80%", md: 650 }, maxHeight: "85vh", display: "flex", flexDirection: "column", bgcolor: current?.brand === "EARTHLINE_MADE" ? "#EDE8E4" : "#FFFFFF", color: current?.brand === "EARTHLINE_MADE" ? "#564F47" : "#7a0007", borderRadius: 3, boxShadow: 24, overflow: "hidden", }}>
					{
						current && (
							<>
								{/* HEADER */}
								<Box sx={{ p: 3, borderBottom: "1px solid rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
									<Typography variant="h6" sx={{ fontWeight: 600 }} > {`Subject:`} {current.subject || "No Subject"} </Typography>
									<IconButton onClick={() => setOpen(false)}> <CloseIcon /> </IconButton>
								</Box>
								{/* CONTENT */}
								<Box sx={{ p: 3, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2, }}>
									<Box>
										<Typography sx={{ fontWeight: 600, pb: 2 }}> {`Message`} </Typography>
										<Typography sx={{ lineHeight: 1, wordBreak: "break-word", background: "#564F47", color: "#EDE8E4", borderRadius: 2, padding: 2, }}> {current.message} </Typography>
									</Box>
									<Divider />
									<Box>
										<Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}> {`Personal Information`} </Typography>
										<Stack spacing={1.2} sx={{ background: "#564F47", color: "#EDE8E4", borderRadius: 2, padding: 2, }}>
											<Typography> <strong>{`Name:`}</strong> {current.name} </Typography>
											<Typography> <strong>{`Contact:`}</strong>{" "} {current.phone || "No Number provided"} </Typography>
											<Typography> <strong>{`Email:`}</strong> {current.email} </Typography>
											<Typography> <strong>{`Enquiry for:`}</strong> {current.brand} </Typography>
										</Stack>
									</Box>
								</Box>
								{/* ACTION BAR */}
								<Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.1)", display: "flex", justifyContent: "flex-end", gap: 2, }}>
									<IconButton onClick={() => markAsUnread([current.id])} sx={{ bgcolor: "#EDE8E4", color: "#564F47", border: "1px solid #564F47", "&:hover": { bgcolor: "#564F47", color: "#EDE8E4", }, }}>
										<MarkEmailUnreadIcon />
									</IconButton>
									<IconButton onClick={() => deleteMessages([current.id])} sx={{ bgcolor: "#EDE8E4", color: "#7A0007", border: "1px solid #7A0007", "&:hover": { bgcolor: "#7A0007", color: "#EDE8E4", }, }}>
										<DeleteIcon />
									</IconButton>
								</Box>
							</>
						)
					}
				</Box>
			</Modal>
		</Box>
	);
}