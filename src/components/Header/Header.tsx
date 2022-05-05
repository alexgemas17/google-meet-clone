import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Container } from '@mui/material';
import { userStore } from '../../store/userStore';

export const Header = () => {
    const { userData, doLogout } = userStore();

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    sx={{ flex: 1 }}
                >
                    Alexapp Meet!
                </Typography>

                <Button sx={{ marginRight: 2 }} variant="outlined" size="small" onClick={() => doLogout()}>
                    Logout
                </Button>
                <Avatar alt={userData.displayName} src={userData.photoURL} />
            </Toolbar>

        </React.Fragment>
    );
}