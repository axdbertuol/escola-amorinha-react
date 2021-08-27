import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";

import MainRouter from "./MainRouter";

function App() {
  return (
    <ThemeProvider>
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
