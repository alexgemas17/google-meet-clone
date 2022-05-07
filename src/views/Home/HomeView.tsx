import React from "react";
import { Container, createTheme, CssBaseline, Button, Stack, Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { CreateNewRoomModal } from '../../components/CreateNewRoomModal/CreateNewRoomModal';
import { roomStore } from "../../store/roomStore";
import { LobbyRoom } from "../LobbyRoom/LobbyRoom";

const theme = createTheme();

export const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const { initRoom, roomUrl } = roomStore();

  React.useEffect(() => {
    if (initRoom) {
      navigate("/room/" + roomUrl)
    }
  }, [initRoom, roomUrl])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />

        <main>
          <Grid container spacing={4}>
            <Typography variant="h6" gutterBottom>
            </Typography>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <LobbyRoom />

            <Stack direction="column" marginRight={15} spacing={2}>
              {/* <Button variant="outlined">Crear room</Button> */}
              <CreateNewRoomModal />
              <Button variant="outlined">Ir a room</Button>
            </Stack>
          </Grid>
        </main>
      </Container>

      <Footer />

    </ThemeProvider>
  )
}
