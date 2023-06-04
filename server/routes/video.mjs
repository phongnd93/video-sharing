import express from "express";
import session from "express-session";
import db from "../db/conn.mjs";
import Utils from "../db/utils.mjs";

const router = express.Router();
const _COLLECTION_VIDEO = 'video';
const _YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const getYoutubeVideoInfo = async (videoId) =>
{
    if (videoId?.length)
    {
        const result = await fetch(`${_YOUTUBE_API_URL}/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`);
        const value = await result.json();
        if (value?.items?.length && value?.items[0].snippet)
        {
            const info = value.items[0].snippet;
            return {
                id: videoId,
                title: info.title,
                description: info.description,
                thumbnails: info.thumbnails
            };
        }
    }
    return null;
}

// This section will help you get a list of all the records.
router.get("/", async (req, res) =>
{
    try
    {
        let collection = await db.collection(_COLLECTION_VIDEO);
        let results = await collection.find({}).toArray();
        res.send({ value: results }).status(200);
    } catch (error)
    {
        res.send({ value: null, message: error.message }).status(400);
    }
});

// This section will help you create a new record.
router.post("/", async (req, res) =>
{
    try
    {
        Utils.getCurrentSession(req);
        const currentSession = req.session;
        if (currentSession?.currentUser)
        {
            const currentUser = currentSession.currentUser;
            const urlVideo = req.body.url;
            const url = new URL(urlVideo);
            let videoId = '';
            //Url is detail mode
            if (url.searchParams.size !== 0 && url.pathname === '/watch')
            {
                videoId = url.searchParams.get('v');
            }

            //Url is short mode 
            if (url.searchParams.size > 0 && url.pathname !== '/watch')
            {
                videoId = url.pathname.slice(1);
            }

            const collection = await db.collection(_COLLECTION_VIDEO);
            if (videoId?.length)
            {
                const videoInfo = await getYoutubeVideoInfo(videoId);
                if (videoInfo)
                {
                    let result = await collection.insertOne({ ...videoInfo, ...{ id: videoId, url: urlVideo, sharedBy: currentUser.email } });
                    if (!result) res.send({ value: null, message: 'Error' }).status(400);
                    else res.send({ value: result }).status(400);
                }
            }
        }
        else res.send({ value: null, redirect: '/', message: error.message }).status(400);
    } catch (error)
    {
        res.send({ value: null, message: error.message }).status(400);
    }

});
export default router;