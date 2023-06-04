import { Button, Card, CardContent, CardHeader, Container, Snackbar, Stack, TextField, Typography } from '@mui/material';
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
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Card elevation={4}>
            <CardHeader title={'Share a Youtube movie'} />
            <CardContent>
                <Stack direction={'column'} gap={2} justifyContent={'flex-end'} width={'60vh'} margin='1rem' padding='1rem'>
                    <Stack direction={'row'} gap={2} alignItems={'baseline'}>
                        <Typography component={'h6'} sx={{ left: 0, top: 0 }} width='fit-content'>Youtube link : </Typography>
                        <TextField
                            sx={{ display: 'flex', flexGrow: 1 }}
                            variant="outlined"
                            size='small'
                            onChange={(e) => { setVideoUrl(e.target.value); }}
                        />
                    </Stack>
                    <Stack direction={'row'} gap={2} alignItems={'baseline'}>
                        <Typography component={'h6'} sx={{ left: 0, top: 0, visibility: 'hidden' }} width='fit-content'>Youtube link : </Typography>
                        <Button sx={{ display: 'flex', flexGrow: 1 }} variant='outlined' onClick={handleShareClick}>Share</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbar.message}
        />
    </Container>
};

export default Share;
