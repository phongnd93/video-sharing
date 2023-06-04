import { Container, Typography } from '@mui/material';
import logo from '../logo.svg';
import React, { useContext, useEffect } from 'react';
import { AppContextProps, AppContext } from '../AppProvider';
import { VideoModel } from '../models/VideoModel';
import { VideoItem } from '../components/VideoItem';

const Home = () =>
{
    const { videos } = useContext<AppContextProps>(AppContext);

    return <Container maxWidth={'lg'}>
        {(videos !== undefined && videos.length > 0) && videos.map((v: VideoModel) => (<VideoItem v={v} onItemClick={() => { }} />))}
    </Container>
};

export default Home;