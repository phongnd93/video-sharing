import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { VideoModel } from "../models/VideoModel"

export type VideoItemProps = {
    v: VideoModel,
    onItemClick?: (v: VideoModel) => void
}
type VideoThumbnail = {
    url?: string,
    width?: number,
    height?: number
}

export const VideoItem = ({ v, onItemClick }: VideoItemProps) =>
{
    let thumbnail: VideoThumbnail = v?.thumbnails?.default ? v.thumbnails.default : {};
    return <Card
        key={v.id}
        onClick={() =>
        {
            onItemClick && onItemClick(v);
        }}
        sx={{ display: 'flex' }}>
        <CardMedia
            component="img"
            height={thumbnail.height}
            image={thumbnail.url}
            alt={v.title}
        />
        <CardContent>
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
        </CardContent>
    </Card>
}