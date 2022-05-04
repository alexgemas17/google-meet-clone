import React from "react";
import { Container, createTheme, CssBaseline, Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "../../components/Footer/Footer";
import { userStore } from "../../store/store";
import { LobbyRoom } from "../Room/LobbyRoom";
import { Header } from "../../components/Header/Header";

const theme = createTheme();

export const HomeView: React.FC = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />

        <main>
          <Grid container spacing={4}>
            <Typography variant="h6" gutterBottom>
              Welcome!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
          >
            <LobbyRoom />
          </Grid>
        </main>
      </Container>

      <Footer />

    </ThemeProvider>
  )
}
