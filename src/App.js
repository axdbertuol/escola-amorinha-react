import "./App.css";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider as StudentFormDataProvider } from "./context/StudentFormContext";

function App() {
  return (
    <StudentFormDataProvider>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </StudentFormDataProvider>
  );
}

export default App;
