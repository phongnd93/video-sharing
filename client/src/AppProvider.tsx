import React, { createContext, useEffect, useState } from "react";
import { VideoModel } from "./models/VideoModel";
import { UserModel } from "./models/UserModel";

export type AppProps = {
    videos?: VideoModel[],
    currentUser?: string,
}
type ShareResult = {
    value?: VideoModel,
    message?: string
}
export interface AppContextProps extends AppProps
{
    children?: any,
    getVideos?: () => Promise<VideoModel[]>,
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
        videos: []
    });

    useEffect(() =>
    {
        const { videos } = state;
        if ((!videos || !videos.length) && getVideos)
        {
            getVideos().then((result) =>
            {
                const u = localStorage.getItem('currentUser');
                setState({ ...state, ...{ currentUser: u || '', videos: result || [] } });
            });
        }
    }, []);

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

    const logout = () =>
    {
        setState({ ...state, ...{ currentUser: undefined } });
        localStorage.removeItem('currentUser');
    }

    return (
        <AppContext.Provider value={{
            ...state,
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