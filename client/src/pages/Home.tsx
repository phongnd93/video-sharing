import { CircularProgress, Container, Grid, Stack } from '@mui/material';
import React, { useContext } from 'react';
import { AppContextProps, AppContext } from '../AppProvider';
import { VideoModel } from '../models/VideoModel';
import { VideoItem } from '../components/VideoItem';

const Home = () =>
{
    const { videos, loading } = useContext<AppContextProps>(AppContext);

    return <Container maxWidth={'lg'}>
        {loading && <Stack
            height='100%'
            justifyContent='center'
            alignItems='center'>
            <CircularProgress color='success' variant='indeterminate' size={'3rem'} />
        </Stack>
        }
        {(!loading && videos !== undefined && videos.length > 0) &&
            <Stack marginY={'2rem'} direction='column' gap={3}>
                {videos.map((v: VideoModel) => (<VideoItem v={v} onItemClick={() => { }} />))}
            </Stack>
        }
    </Container>
};

export default Home;