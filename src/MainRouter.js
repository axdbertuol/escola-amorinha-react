import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";

import HomePage from "./pages/HomePage";
import StudentListPage from "./pages/StudentListPage";
import StudentRegisterPage from "./pages/StudentRegisterPage";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/list">
          <HomePage>
            <StudentListPage />
          </HomePage>
        </Route>
        <Route path="/register">
          <HomePage>
            <StudentRegisterPage />
          </HomePage>
        </Route>
        <Route path="/edit/:id">
          <HomePage>
            <StudentRegisterPage />
          </HomePage>
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRouter;
