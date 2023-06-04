import { Card, CardContent, Grid, Stack, Typography } from "@mui/material"
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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}><ReactPlayer controls url={v.url} width='100%' /></Grid>
                    <Grid item xs={12} md={6}>
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
                    </Grid>
                </Grid>
            </Stack>
        </CardContent>
    </Card >
}