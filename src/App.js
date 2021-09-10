import { colors } from "@material-ui/core/";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect } from "react";

import { apiServer } from "./mock/server";
import { Provider as AuthProvider } from "./context/AuthContext";
import MainRouter from "./MainRouter";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.purple[800],
    },
    secondary: {
      main: colors.red[100],
    },
    tertiary: {
      main: colors.grey[400],
    },
  },
});

function App() {
  useEffect(() => {
    return () => {
      apiServer.shutdown();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
