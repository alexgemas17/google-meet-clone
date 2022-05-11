import { Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, Room as VideoRoom, Participant as VideoParticipant, LocalTrackPublication, LocalVideoTrack, } from 'twilio-video';
import { useDate } from "../../hooks/useDate";
import { roomStore } from "../../store/roomStore";
import { userStore } from "../../store/userStore";
import { VideoRender } from "./VideoRender";
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

import './RoomManager.scss'

export const RoomManager = () => {
  const navigate = useNavigate();
  const { userData } = userStore()
  const { initRoom, room, nameRoom, roomToken, setNewRoom, hangup } = roomStore()
  const [gridSpacing, setGridSpacing] = useState(4);
  const [minNumber, setminNumber] = useState(4);
  const [controlNumber, setcontrolNumber] = useState(2);
  const { time } = useDate()

  const [participants, setParticipants] = useState<VideoParticipant[]>([]); 

  // Handle grid layout
  useEffect(() => {
    if (participants.length === controlNumber && minNumber >= 1) {
      setminNumber(minNumber - 2)
      setcontrolNumber(controlNumber + 3)
      setGridSpacing(minNumber);
    }

  }, [participants]);

  // Handle events from participant
  useEffect(() => {
    const participantConnected = (participant: VideoParticipant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: VideoParticipant) => {
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);

    // Clean
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const handlehangup = React.useCallback(() => {
    if (room) {
      room.localParticipant.tracks.forEach((trackPub: LocalTrackPublication) => {
        const track = trackPub.track as LocalVideoTrack
        track.stop();
      });
      room.disconnect();
    }

    hangup()

    navigate("/")
  }, []);

  if (initRoom && !room) {
    return <span className="room-manager-loading"><Typography color={'white'} variant="h5" component="h4">Loading...</Typography></span>
  }

  return (
    <div className="room-manager" >
      <Grid container style={{ height: "100vh", display: 'flex', flexDirection: "inherit", justifyContent: "center", alignItems: "center" }}>
        <Grid item style={{ textAlign: "center" }} xs={gridSpacing}>
          <VideoRender
            key={room.localParticipant.sid}
            numberOfParticipant={4}
            participant={room.localParticipant}
          />
        </Grid>

        {
          participants.map((participant) => (
            <Grid item style={{ textAlign: "center" }} xs={gridSpacing}>
              <VideoRender key={participant.sid} numberOfParticipant={4} participant={participant} />
            </Grid>
          ))
        }
      </Grid>

      <div className="room-info">
        <Typography sx={{ marginLeft: "20px" }} color={'white'} variant="h5" component="h4">{time} | {nameRoom}</Typography>
        {/* <Typography sx={{ marginRight:"20px"}}  color={'white'} variant="h5" component="h4">chat!</Typography> */}
      </div>

      <div className="room-action">
        <IconButton aria-label="hidde-video" sx={{ color:'white' }} color="default">
          <VideocamOffIcon sx={{ fontSize: "35px" }} />
        </IconButton>

        <IconButton aria-label="hang" sx={{ backgroundColor: 'red', marginLeft: "15px", marginRight: "15px" }} color="default" onClick={() => { handlehangup() }}>
          <CallEndIcon sx={{ fontSize: "35px" }} />
        </IconButton>

        <IconButton aria-label="hidde-microphone" sx={{ color:'white' }}  color="default">
          <MicOffIcon sx={{ fontSize: "35px" }} />
        </IconButton>
      </div>
    </div>
  )
}
