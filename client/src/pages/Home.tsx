import { CircularProgress, Container, Stack } from '@mui/material';
import React, { useContext } from 'react';
import { AppContextProps, AppContext } from '../AppProvider';
import { VideoModel } from '../models/VideoModel';
import { VideoItem } from '../components/VideoItem';

const Home = () =>
{
    const { videos, loading } = useContext<AppContextProps>(AppContext);

    return <Container maxWidth={'lg'}>
        {loading && <CircularProgress color='success' variant='indeterminate' size={'3rem'} />}
        {(!loading && videos !== undefined && videos.length > 0) &&
            <Stack marginY={'2rem'} direction='column' gap={3}>
                {videos.map((v: VideoModel) => (<VideoItem v={v} onItemClick={() => { }} />))}
            </Stack>
        }
    </Container>
};

export default Home;