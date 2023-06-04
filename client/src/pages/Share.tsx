import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Box, Button, Card, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, Snackbar, Stack, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../AppProvider';
const Share = () =>
{
    const { share } = useContext(AppContext);

    const [videoUrl, setVideoUrl] = useState<string>();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });

    const handleShareClick = async () =>
    {
        if (share && videoUrl && videoUrl.length > 0)
        {
            const result = await share(videoUrl);
            if (result && result.value)
            {
                setSnackbar({ open: true, message: 'Succeeded' });
            } else setSnackbar({ open: true, message: result.message || '' });
        }
    };

    const handleCloseSnackbar = () =>
    {
        setSnackbar({ open: false, message: '' });
    }

    return <Container maxWidth='xl' sx={{
        display: 'flex',
        height: '100%'
    }}>
        <Stack flex={1}>
            <Card>
                <TextField
                    variant="standard"
                    onChange={(e) => { setVideoUrl(e.target.value); }}
                />
                <Button onClick={handleShareClick}>Share</Button>
            </Card>
        </Stack>
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbar.message}
        />
    </Container>
};

export default Share;
