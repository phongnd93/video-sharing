import React, { createContext, useEffect, useState } from "react";
import { VideoModel } from "./models/VideoModel";
import { UserModel } from "./models/UserModel";
import { socket } from './socket';

export type AppProps = {
    videos?: VideoModel[],
    currentUser?: string,
    loading?: boolean
}
type ShareResult = {
    value?: VideoModel,
    message?: string
}
export interface AppContextProps extends AppProps
{
    children?: any,
    isConnected?: boolean,
    events?: VideoModel[],
    getVideos?: () => Promise<VideoModel[]>,
    removeEvent?: (v: VideoModel) => void,
    share?: (videoUrl: string) => Promise<ShareResult>,
    join?: (user: UserModel) => void,
    logout?: () => void,
}

export const AppContext = createContext<AppContextProps>({});

const _SERVER_URL = "http://localhost:5050";

export const AppProvider = ({ children }: AppContextProps) =>
{

    const [state, setState] = useState<AppProps>({
        currentUser: undefined,
        videos: [],
        loading: false,
    });

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [events, setEvents] = useState<VideoModel[]>([]);

    useEffect(() =>
    {
        function onConnect()
        {
            setIsConnected(true);
            console.log('Socket connected');
        }

        function onDisconnect()
        {
            setIsConnected(false);
            console.log('Socket disconnected');
        }

        function onFooEvent(value: VideoModel)
        {
            const { currentUser } = state;
            if (value?.sharedBy !== currentUser)
            {
                setEvents(previous => [...previous, value]);
                console.log('New video', value, currentUser);
            }
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('new-video', onFooEvent);

        return () =>
        {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('new-video', onFooEvent);
        };
    }, []);

    useEffect(() =>
    {
        const { videos, currentUser } = state;
        let isInit = false;
        if ((!videos || !videos.length) && !currentUser && !isInit)
        {
            init();
        }
        return () =>
        {
            isInit = true;
        }
    }, []);

    const init = async () =>
    {
        setState({ ...state, ...{ loading: true } });
        const currentUser = await getCurrentUser();
        const videos = await getVideos();
        setState({ ...state, ...{ currentUser: currentUser || '', videos: videos || [], loading: false } });
    }

    const getCurrentUser = async () =>
    {
        const res = await fetch(`${_SERVER_URL}/user`);
        const result = await res.json();
        if (result && result.value)
        {
            return result.value;
        }
        return null;
    }
    const getVideos = async () =>
    {
        const res = await fetch(`${_SERVER_URL}/video`);

        const result = await res.json();
        if (result && result.value)
        {
            return result.value;
        }

        return null;
    }

    const share = async (videoUrl: string) =>
    {
        const res = await fetch(`${_SERVER_URL}/video`, {
            method: 'POST',
            body: JSON.stringify({ url: videoUrl }),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const result = await res.json();
        if (result && result.value)
        {
            const videos = await getVideos();
            if (videos)
            {
                setState({ ...state, ...{ videos: videos } });
            }
        }
        return result;
    };

    const join = async (user: UserModel) =>
    {
        const res = await fetch(`${_SERVER_URL}/user/join`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const result = await res.json();
        if (result && result.value)
        {
            setState({ ...state, ...{ currentUser: result.value } });
            localStorage.setItem('currentUser', result.value);
        } else console.log('Join : ', result.message);
    }

    const logout = async () =>
    {
        const res = await fetch(`${_SERVER_URL}/user/logout`);
        const result = await res.json();
        if (result)
        {
            setState({ ...state, ...{ currentUser: undefined } });
            localStorage.removeItem('currentUser');
        }
    }

    const removeEvent = (v: VideoModel) =>
    {
        setEvents([...events.filter(e => e.id !== v.id)]);
    }

    return (
        <AppContext.Provider value={{
            ...state,
            isConnected,
            events,
            removeEvent,
            getVideos,
            share,
            join,
            logout
        }}
        >
            {children}
        </AppContext.Provider>
    );
}