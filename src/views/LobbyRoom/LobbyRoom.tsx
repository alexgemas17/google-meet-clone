import React from 'react'
import ContrastIcon from '@mui/icons-material/Contrast';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material'
import { createLocalVideoTrack, LocalVideoTrack } from 'twilio-video'
import { GaussianBlurBackgroundProcessor } from '@twilio/video-processors';
import { basicVideoProcessor, grayVideoProcessor, VideoEffect } from '../../Dtos/VideoEffects';

import './LobbyRoom.scss'

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
            videoTrack.attach(videoRef.current);

            if (!videoTrack.processor) {
                const bg = new GaussianBlurBackgroundProcessor({
                    assetsPath: '/',
                    maskBlurRadius: 10,
                    blurFilterRadius: 5,
                  });
                videoTrack.addProcessor(basicVideoProcessor)
            }
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

    console.log(process.env);
    

    return (
        <Grid marginTop={12}>
            {!videoIsReady && (
                <Box className='non-video'>
                    <Typography variant="h6" gutterBottom align="center" sx={{ flex: 1 }}>
                        No camera
                    </Typography>
                </Box>)
            }
            <Box sx={{ display: { xs: videoIsReady ? 'initial' : 'none', md: 'block' } }} >
                <Box>
                    <div id="local-media" className='video-preview'>
                        <video ref={videoRef} autoPlay={true} />
                        {/* <audio ref={audioRef} autoPlay={true} muted={true} /> */}
                        <div className='video-options'>
                            <IconButton aria-label="change gray effect" color="primary" onClick={() => { handleChangeGrayScaleEffect() }}>
                                <ContrastIcon />
                            </IconButton>
                            {/* <Button variant="outlined" > Fondo borroso </Button> */}
                        </div>
                    </div>
                </Box>
            </Box >
        </Grid>
    )
}