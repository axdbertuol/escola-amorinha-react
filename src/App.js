import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider as StudentsProvider } from "./context/StudentsContext";

import MainRouter from "./MainRouter";

function App() {
  return (
    <StudentsProvider>
      <ThemeProvider>
        <MainRouter />
      </ThemeProvider>
    </StudentsProvider>
  );
}

export default App;
