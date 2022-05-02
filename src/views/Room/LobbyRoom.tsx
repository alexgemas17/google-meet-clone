import React from 'react'
import { createLocalVideoTrack, LocalVideoTrack } from 'twilio-video'

import './LobbyRoom.scss'

export const LobbyRoom = () => {
    const [videoIsReady, setvideoIsReady] = React.useState(false)
    const [hasVideoEffect, sethasVideoEffect] = React.useState(false)
    const [gaussianBlur, setgaussianBlur] = React.useState(false)

    const videoProcessor = {
        processFrame: (inputFrame: any, outputFrame: any) => {
            const ctx = outputFrame.getContext('2d');
            if (hasVideoEffect) {
                ctx.filter = 'grayscale(100%)';
            }
            ctx.drawImage(inputFrame, 0, 0);
        }
    };

    const createLocalVideo = async () => {
        const videoTrack: LocalVideoTrack = await createLocalVideoTrack({
            width: 640,
            height: 480,
            frameRate: 30
        })

        const localMediaContainer = document.getElementById('local-media');
        localMediaContainer?.appendChild(videoTrack.attach());
        
        videoTrack.addProcessor(videoProcessor);
    }

    React.useEffect(() => {
        createLocalVideo()
        setvideoIsReady(true)

        return () => {
            setvideoIsReady(false)
            const localMediaContainer = document.getElementById('local-media');
            localMediaContainer?.replaceChildren();
        }

    }, [videoProcessor])


    return (
        <div>
            <span>LobbyRoom</span>
            <button onClick={() => { sethasVideoEffect(!hasVideoEffect) }}>Blanco y negro</button>
            <button onClick={() => { setgaussianBlur(!hasVideoEffect) }}>Fondo borroso</button>
            {videoIsReady && <div id="local-media" className='video-preview'></div>}
        </div>
    )
}
