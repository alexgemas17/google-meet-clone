import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, Room as VideoRoom, Participant as VideoParticipant, LocalTrackPublication, LocalVideoTrack, } from 'twilio-video';
import { useDate } from "../../hooks/useDate";
import { roomStore } from "../../store/roomStore";
import { userStore } from "../../store/userStore";
import { VideoRender } from "./VideoRender";

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

  useEffect(() => {
    console.log(participants.length + 1)
    console.log({ controlNumber })
    if (participants.length === controlNumber && minNumber >= 1) {
      setminNumber(minNumber - 2)
      setcontrolNumber(controlNumber + 3)
      setGridSpacing(minNumber);
    }

  }, [participants]);

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
        {/* <Typography color={'white'} variant="h5" component="h4">{time} | {nameRoom}</Typography> */}
      </div>

      <div className="room-action">
        <Typography color={'white'} variant="h5" component="h4">{time} | {nameRoom}</Typography>
        <div>
          <button onClick={() => handlehangup()}>quitar video</button>
          <button onClick={() => handlehangup()}>Log out</button>
          <button onClick={() => handlehangup()}>quitar audio</button>
        </div>
        <Typography color={'white'} variant="h5" component="h4">chat!</Typography>
      </div>
    </div>

    // <div className="room-manager">
    //   <div className="container">
    //     {/* <Grid container justifyContent={"center"} spacing={3} alignItems="stretch">

    //     </Grid> */}
    //     <VideoRender
    //       key={room.localParticipant.sid}
    //       participant={room.localParticipant}
    //     />

    //     {
    //       participants.map((participant) => (
    //         <React.Fragment>
    //           <VideoRender key={participant.sid} participant={participant} />
    //         </React.Fragment>
    //       ))
    //     }
    //   </div>
    //     
    // </div>
  )
}
