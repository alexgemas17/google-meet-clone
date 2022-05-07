import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { roomStore } from '../../store/roomStore';
import { userStore } from '../../store/userStore';

export const CreateNewRoomModal = () => {
    const { setInfoRoom } = roomStore();
    const { userData } = userStore();

    const [open, setOpen] = React.useState(false);
    const [nameRoom, setNameRoom] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInfoRoom(nameRoom, userData.displayName)
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create new room
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter the name of the new room:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="roomName"
                        label="Room name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setNameRoom(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

