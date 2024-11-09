import React, {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    CircularProgress,
    Snackbar,
    Grid,
    Stack,
    Icon
} from '@mui/material';
import Layout from "../components/Layout";
import {FaNpm, FaPython} from "react-icons/fa";

const ContactMe = () => {
    // Form state management
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple client-side validation
        if (!name || !email || !message || !subject) {
            setFormError('Please fill out all required fields.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setFormError('Please enter a valid email address.');
            return;
        }

        setFormError(null);
        setIsSubmitting(true);

        // Simulate API request (replace with actual backend logic)
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage(true);
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
            setAttachment(null);
        }, 2000);
    };

    return (
            <Container>
                <Box sx={{p: 3, mt: 4, borderRadius: 2}}>
                    <Typography variant="h5" sx={{mb: 2}}>Contact Me</Typography>
                    <Typography variant="body1" sx={{mb: 3}}>
                        Please fill out the form below to contact me:
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={!!formError}
                                    helperText={formError && formError}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Your Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!formError}
                                    helperText={formError && formError}
                                    required
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number (optional)"
                                    variant="outlined"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Subject"
                                    variant="outlined"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    error={!!formError}
                                    helperText={formError && formError}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Message"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    error={!!formError}
                                    helperText={formError && formError}
                                    required
                                />
                            </Grid>

                            {/* File Upload */}
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                >
                                    Upload Attachment
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => setAttachment(e.target.files[0])}
                                    />
                                </Button>
                                {attachment &&
                                    <Typography variant="body2" sx={{mt: 1}}>Attachment: {attachment.name}</Typography>}
                            </Grid>
                        </Grid>

                        <Stack direction="row" spacing={2} sx={{mt: 3}}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {isSubmitting ? <CircularProgress size={24} color="inherit"/> : 'Send Message'}
                            </Button>
                        </Stack>
                    </form>

                    {/* Success Snackbar */}
                    <Snackbar
                        open={successMessage}
                        autoHideDuration={4000}
                        onClose={() => setSuccessMessage(false)}
                        message="Your message has been sent successfully!"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    />
                </Box>
            </Container>
    );
};

export default ContactMe;
