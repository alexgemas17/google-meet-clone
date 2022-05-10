import React from "react";
import { Container, createTheme, CssBaseline, Button, Stack, Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { CreateNewRoomModal } from '../../components/CreateNewRoomModal/CreateNewRoomModal';
import { roomStore } from "../../store/roomStore";
import { LobbyRoom } from "../LobbyRoom/LobbyRoom";
import { NavigateRoomModal } from "../../components/CreateNewRoomModal/NavigateRoomModal";

const theme = createTheme();

export const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const { room, roomUrl } = roomStore();

  React.useEffect(() => {
    if (room && roomUrl) {
      navigate("/room/" + roomUrl)
    }
  }, [room, roomUrl])

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
              <CreateNewRoomModal />
              <NavigateRoomModal />
            </Stack>
          </Grid>
        </main>
      </Container>

      <Footer />

    </ThemeProvider>
  )
}
