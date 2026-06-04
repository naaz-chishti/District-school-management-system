import React from "react";
import ReactDOM from "react-dom/client";
import {
  ThemeProvider
} from "./context/ThemeContext";

import App from "./App";

import {
  ThemeProvider
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ThemeProvider>
  <App />
</ThemeProvider>
  </ThemeProvider>
);