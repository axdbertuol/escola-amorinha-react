import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";

import { Provider as StudentsProvider } from "./context/StudentsContext";
import PageWrapper from "./pages/PageWrapper";
import StudentListPage from "./pages/StudentListPage";
import StudentRegisterPage from "./pages/StudentRegisterPage";

const MainRouter = () => {
  return (
    <Router>
      <StudentsProvider>
        <Switch>
          <Route exact path="/" component={PageWrapper}></Route>
          <Route path="/list" component={StudentListPage}></Route>
          <Route path="/register" component={StudentRegisterPage}></Route>
          <Route path="/edit/:id" component={StudentRegisterPage}></Route>
        </Switch>
      </StudentsProvider>
    </Router>
  );
};

export default MainRouter;
