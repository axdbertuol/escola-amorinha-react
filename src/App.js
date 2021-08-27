import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";

import MainRouter from "./MainRouter";
import { Provider as StudentsProvider } from "./context/StudentsContext";
import HomePage from "./pages/HomePage";
import StudentListPage from "./pages/StudentListPage";
import StudentRegisterPage from "./pages/StudentRegisterPage";

function App() {
  return (
    <ThemeProvider>
      <MainRouter />
    </ThemeProvider>
  );

  // return (
  //   <StudentsProvider>
  //     <ThemeProvider>
  //       <StudentRegisterPage />
  //       <StudentListPage />
  //     </ThemeProvider>
  //   </StudentsProvider>
  // );
}

export default App;
