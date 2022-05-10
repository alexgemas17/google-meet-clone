import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export const NavigateRoomModal = () => {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [urlRoom, setUrlRoom] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        navigate('/room/' + urlRoom);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Navigate to room
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter the room url:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="roomName"
                        label="Room name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setUrlRoom(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Go!</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

