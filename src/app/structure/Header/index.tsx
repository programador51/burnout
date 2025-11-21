"use client";

import React from "react";
import { Typography, Box, useMediaQuery, useTheme, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import ui from "./styles.module.scss";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ py: 2 }}
    >
      {/* LOGO IZQUIERDO */}
      <Grid
        size={{
          xs: 12,
          sm: 3,
          md: 3,
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box textAlign="center">
          <img
            src="/fime.jpg"
            alt="fime"
            className={ui.logo}
            style={{
              height: isMobile ? "50px" : "60px",
              maxWidth: "100%",
            }}
          />
        </Box>
      </Grid>

      {/* TEXTOS */}
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          textAlign="center"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            fontWeight: 600,
          }}
        >
          Facultad de Ingeniería Mecánica y Eléctrica
        </Typography>

        <Typography
          textAlign="center"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
          }}
        >
          Universidad Autónoma de Nuevo León
        </Typography>

        
      </Grid>

      {/* LOGO DERECHO */}
      <Grid
        size={{
          xs: 12,
          sm: 3,
          md: 3,
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box textAlign="center">
          <img
            src="/uanl.png"
            className={ui.logo}
            alt="uanl"
            style={{
              height: isMobile ? "50px" : "60px",
              maxWidth: "100%",
            }}
          />
        </Box>
      </Grid>

      <Stack justifyContent={'center'}>

      <Typography textAlign={'center'} variant="body2">José Luis Pérez Olguín 1731168</Typography>
      <Typography textAlign={'center'} variant="body2">Enrique de Jesús Rodríguez Amaya 1879359</Typography>
      <Typography textAlign={'center'} variant="body2">Manuel Alejandro Molina Alcazar 1996675</Typography>
      <Typography textAlign={'center'} variant="body2">Erick Efren Beltrán Amaya 1960733</Typography>
      <Typography textAlign={'center'} variant="body2">Diego Tristan Castro Franco 2109462</Typography>
      </Stack>
    </Grid>
  );
}
