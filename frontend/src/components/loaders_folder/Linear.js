import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff9a9c",
    },
  },
});

function Linear() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </Box>
    </ThemeProvider>
  );
}

export default Linear;
