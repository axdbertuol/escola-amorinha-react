import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";

import MainRouter from "./MainRouter";
// 03045e
// 023e8a
// 0077b6
// 48cae4
// caf0f8

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: blue[100],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
