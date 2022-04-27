import React, { useState, useCallback } from 'react';

const VideoChat = () => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);

    const handleUsernameChange = useCallback(event => {
        setUsername(event.target.value);
    }, []);

    const handleRoomNameChange = useCallback(event => {
        setRoomName(event.target.value);
    }, []);

    return <div></div> // we'll build up our response later
};