"use client";

import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';

import { createTheme, ThemeProvider } from "@mui/material/styles";

type Brand = "EARTHLINE_MADE" | "HANDOUT_STUDIOS";

interface ContactUsPageProps { brand: Brand; }

export default function ContactUsPage({ brand }: ContactUsPageProps) {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "error" | null; message: string; }>({ type: null, message: "" });

    const isMobile = useMediaQuery("(max-width:600px)");

    const theme = createTheme({
        palette: {
            mode: brand === "EARTHLINE_MADE" ? "light" : "dark",
            primary: { main: brand === "EARTHLINE_MADE" ? "#564F47" : "#FFFFFF", },
            background: { default: brand === "EARTHLINE_MADE" ? "#EDE8E4" : "#7a0007", },
        },
        typography: { fontFamily: "Inter, sans-serif", },
    });

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePhone = (phone: string) => phone === "" || /^[0-9+\-\s]{7,15}$/.test(phone);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setShowAlert(true);
        setAlert({ type: null, message: "" });

        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get("name")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const phone = formData.get("phone")?.toString() || "";
        const subject = formData.get("subject")?.toString() || "";
        const message = formData.get("message")?.toString() || "";

        // Basic Required Validation
        if (!name || !email || !message) {
            setAlert({ type: "error", message: "Please fill all required fields.", });
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setAlert({type: "error",message: "Please enter a valid email address.", });
            setLoading(false);
            return;
        }

        if (!validatePhone(phone)) {
            setAlert({ type: "error", message: "Please enter a valid phone number.", });
            setLoading(false);
            return;
        }

        const payload = { name, email, phone, subject, message, brand, };

        try {
            const res = await fetch("/api/contact-us", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), });
            if (!res.ok) throw new Error("Failed to submit");
            setAlert({ type: "success", message: "Your message has been sent successfully.", });
            form.reset(); // ✅ clear form properly
        }
        catch (error) { setAlert({ type: "error", message: "Something went wrong. Please try again later.", }); }
        setLoading(false);
    }

    useEffect(() => {
        if (showAlert) { setTimeout(() => { setShowAlert(false); }, 2000); }
    }, [showAlert]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 8 }, }}>
                <Card elevation={0} sx={{ width: "100%", maxWidth: 600, borderRadius: 4, backdropFilter: "blur(12px)", backgroundColor: brand === "EARTHLINE_MADE" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.08)", boxShadow: brand === "EARTHLINE_MADE" ? "0 20px 60px rgba(0,0,0,0.1)" : "0 20px 60px rgba(0,0,0,0.4)", p: { xs: 1, sm: 2 }, }}>
                    <CardContent>
                        <Typography variant={isMobile ? "h4" : "h3"} fontWeight={700} gutterBottom> {`Let's Talk.`} </Typography>

                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}> {`Tell us what's on your mind.`} </Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5,}}>
                            <TextField name="name" label="Your Name" required fullWidth />
                            <TextField name="email" label="Your Email" type="email" required fullWidth />
                            <TextField name="phone" label="Phone (Optional)" fullWidth />
                            <TextField name="subject" label="Subject" fullWidth />
                            <TextField name="message" label="Your Message" required multiline rows={4} fullWidth />
                            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ mt: 2, borderRadius: 3, fontWeight: 600, py: 1.5, }}> {loading ? "Sending..." : "Send Message"} </Button>
                            { alert.type && showAlert && <Alert severity={alert.type} sx={{ mt: 2 }}> <AlertTitle> {alert.type === "success" ? "Success" : "Error"} </AlertTitle> {alert.message} </Alert> }
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
}