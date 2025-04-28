import React, {useState} from 'react';
import {Popover, Typography, Box} from '@mui/material';

const NotePopup = ({triggerText, noteContent}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Typography
                component="span"
                onClick={handleClick}
                sx={{
                    color: '#00ffcc',
                    textShadow: '0 0 10px rgba(0,255,204,0.7)',
                    fontFamily: `'Fira Code', monospace`,
                    fontSize: '1.05rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': {
                        opacity: 0.8,
                    },
                }}
            >
                {triggerText}
            </Typography>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: '#121212',
                        border: '1px solid #00ffcc',
                        borderRadius: '8px',
                        padding: 2,
                        maxWidth: 300,
                        boxShadow: '0 0 20px rgba(0,255,204,0.4)',
                    }
                }}
            >
                <Typography
                    sx={{
                        color: '#e0e0e0',
                        fontFamily: `'Fira Code', monospace`,
                        fontSize: '0.95rem',
                        lineHeight: 1.5,
                    }}
                >
                    {noteContent}
                </Typography>
            </Popover>
        </>
    );
};
export default NotePopup;


/*
<NotePopup
  triggerText="See Note"
  noteContent="This is an extra explanation or side detail!"
/>
<Paragraph>
    Here's a sentence with an extra tip <NotePopup triggerText="(more info)" noteContent="This feature uses a distributed quorum model." /> inline.
</Paragraph>
* */