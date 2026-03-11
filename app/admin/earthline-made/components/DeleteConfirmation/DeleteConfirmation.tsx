'use client'

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = { deleteOpen: boolean; setDeleteOpen: (v: boolean) => void; deleteTarget: any; confirmDelete: () => void; }

export default function DeleteConfirmation({deleteOpen, setDeleteOpen, deleteTarget, confirmDelete, }: Props) {

    return (

        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", sm: 400 }, p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: "#564F47" }} > {`Delete Product`} </Typography>
                <Typography sx={{ mb: 3 }}> {`Are you sure you want to delete`}{" "} <strong>{deleteTarget?.product}</strong>? </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="contained" sx={{ backgroundColor: "#EDE8E4", color: "#564F47" }} onClick={() => setDeleteOpen(false)}> {`Cancel`} </Button>
                    <Button variant="contained" sx={{ backgroundColor: "#7a0007", color: "#EDE8E4", "&:hover": { backgroundColor: "#5c0005" } }} onClick={confirmDelete}> {`Delete`} </Button>
                </Box>
            </Card>
        </Modal>
    )
}