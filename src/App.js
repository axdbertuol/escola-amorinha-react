import "./App.css";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider as StudentsProvider } from "./context/StudentsContext";

function App() {
  return (
    <StudentsProvider>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </StudentsProvider>
  );
}

export default App;
