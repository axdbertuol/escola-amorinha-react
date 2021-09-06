import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";

import { Provider as StudentsProvider } from "./context/StudentsContext";
import { Provider as AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";

import StudentListPage from "./pages/StudentListPage";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import StudentDetailPage from "./pages/StudentDetailPage";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <StudentsProvider>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/list" component={StudentListPage}></Route>
            <Route
              exact
              path="/register"
              component={StudentRegisterPage}
            ></Route>
            <Route
              path="/student-profile/:id"
              component={StudentDetailPage}
            ></Route>
            <Route path="/list/:type" component={StudentListPage}></Route>
            <Route path="/edit/:id" component={StudentRegisterPage}></Route>
          </StudentsProvider>
        </AuthProvider>
      </Switch>
    </Router>
  );
};

export default MainRouter;
