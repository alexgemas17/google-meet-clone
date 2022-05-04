import { Box, Typography, Grid, Container, Stack, Button } from '@mui/material'
import React from 'react'
import { createLocalVideoTrack, LocalVideoTrack, VideoTrack } from 'twilio-video'

import './LobbyRoom.scss'

enum VideoEffect {
    Basic, GrayScale
}

const basicVideoProcessor = {
    processFrame: (inputFrame: any, outputFrame: any) => {
        const ctx = outputFrame.getContext('2d');
        ctx.drawImage(inputFrame, 0, 0);
    }
};

const grayVideoProcessor = {
    processFrame: (inputFrame: any, outputFrame: any) => {
        const ctx = outputFrame.getContext('2d');
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(inputFrame, 0, 0);
    }
};

export const LobbyRoom = () => {
    const [videoTrack, setVideoTrack] = React.useState<(LocalVideoTrack | null)>();

    const [videoIsReady, setvideoIsReady] = React.useState(false)
    const [videoEffect, setVideoEffect] = React.useState<VideoEffect>(VideoEffect.Basic)

    const videoRef = React.useRef<HTMLVideoElement>();

    const createLocalVideo = async () => {
        const videoTrack: LocalVideoTrack = await createLocalVideoTrack({
            width: 640,
            height: 480,
            frameRate: 30
        })
        setVideoTrack(videoTrack)
    }
    React.useEffect(() => {
        createLocalVideo()
    }, [])

    React.useEffect(() => {
        if (videoRef.current && videoTrack) {
            setvideoIsReady(true)
            console.log(videoRef.current);
            videoTrack.attach(videoRef.current);
            videoTrack.addProcessor(basicVideoProcessor)
        }

        return () => {
            videoTrack?.detach()
        }
    }, [videoTrack])

    const handleChangeGrayScaleEffect = () => {
        if (videoRef.current && videoTrack) {
            if (videoEffect === VideoEffect.GrayScale) {
                videoTrack.removeProcessor(grayVideoProcessor)
                videoTrack.addProcessor(basicVideoProcessor)
                setVideoEffect(VideoEffect.Basic)
            } else {
                videoTrack.removeProcessor(basicVideoProcessor)
                videoTrack.addProcessor(grayVideoProcessor)
                setVideoEffect(VideoEffect.GrayScale)
            }
        }
    }

    return (
        <Grid marginTop={12} item xs={12}>
            {!videoIsReady && (
                <Box className='non-video'>
                    <Typography variant="h6" gutterBottom align="center" sx={{ flex: 1 }}>
                        Loading...
                    </Typography>
                </Box>)
            }
            <Box sx={{ display: { xs: videoIsReady ? 'initial' : 'none', md: 'block' } }} >
                <Box>
                    <div id="local-media" className='video-preview'>
                        <video ref={videoRef} autoPlay={true} />
                        {/* <audio ref={audioRef} autoPlay={true} muted={true} /> */}
                    </div>
                    <Button variant="outlined" onClick={() => { handleChangeGrayScaleEffect() }}>Blanco y negro</Button>
                    <Button variant="outlined" > Fondo borroso </Button>
                </Box>
            </Box >

            <Stack direction="column" spacing={2}>
                <Button variant="outlined">Crear room</Button>
                <Button variant="outlined">Ir a room</Button>
            </Stack>
        </Grid>
    )
}