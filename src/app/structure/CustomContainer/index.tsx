"use client";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function CustomContainer({ children = <></> }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>{children}</Container>
    </ThemeProvider>
  );
}
