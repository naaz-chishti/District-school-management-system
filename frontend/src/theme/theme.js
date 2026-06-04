import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb"
    },
    secondary: {
      main: "#7c3aed"
    },
    success: {
      main: "#16a34a"
    },
    warning: {
      main: "#ea580c"
    },
    background: {
      default: "#f4f6f9"
    }
  },

  typography: {
    fontFamily:
      "Poppins, sans-serif"
  },

  shape: {
    borderRadius: 12
  }
});

export default theme;