import { Card, CardContent, Stack, Typography } from "@mui/material"
import ReactPlayer from "react-player"
import { VideoModel } from "../models/VideoModel"

export type VideoItemProps = {
    v: VideoModel,
    onItemClick?: (v: VideoModel) => void
}

export const VideoItem = ({ v, onItemClick }: VideoItemProps) =>
{
    return <Card
        elevation={5}
        key={v.id}
        onClick={() =>
        {
            onItemClick && onItemClick(v);
        }}
        sx={{ display: 'flex' }}>
        <CardContent>
            <Stack direction={'row'} gap={1}>
                <ReactPlayer controls url={v.url} width='100%' />
                <Stack direction={'column'} gap={1}>
                    <Typography gutterBottom variant="h5" component="div">
                        {v.title}
                    </Typography>
                    <Typography variant="body2" component="div">
                        Shared By : {v.sharedBy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Description :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {v.description}
                    </Typography>
                </Stack>
            </Stack>
        </CardContent>
    </Card >
}