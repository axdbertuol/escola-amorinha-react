import { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import MainRouter from "./MainRouter";
import { apiServer } from "./mock/server";
import { Provider as AuthProvider } from "./context/AuthContext";
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: red["100"],
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
