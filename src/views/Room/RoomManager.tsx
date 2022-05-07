import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, Room as VideoRoom, Participant as VideoParticipant, LocalTrackPublication, LocalVideoTrack, } from 'twilio-video';
import { roomStore } from "../../store/roomStore";
import { userStore } from "../../store/userStore";
import { VideoRender } from "./VideoRender";

export const RoomManager = () => {
  const navigate = useNavigate();
  const { userData } = userStore()
  const { initRoom, room, nameRoom, roomToken, setNewRoom, hangup } = roomStore()

  const [participants, setParticipants] = useState<VideoParticipant[]>([]);


  useEffect(() => {
    const participantConnected = (participant: VideoParticipant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: VideoParticipant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
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

  if(initRoom && !room) {
    return <span>Loading...</span>
  }

  console.log({room})

  return (
    <div>
      <h2>Room: {nameRoom}</h2>
      <button onClick={() => handlehangup()}>Log out</button>

      <div className="local-participant">
        <VideoRender
          key={room.localParticipant.sid}
          participant={room.localParticipant}
        />
      </div>

      <h3>Remote Participants</h3>

      <div className="remote-participants">
        {
          participants.map((participant) => (
            <React.Fragment>
              <VideoRender key={participant.sid} participant={participant} />
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}
