import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import './Footer.scss'

export const Footer: React.FC = () => {
    return (
        <footer className='footer-on-bottom' >
            <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Made by '}
                        <Link color="inherit" href="https://github.com/">
                            Alejandro Gemas
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </footer>
    );
}