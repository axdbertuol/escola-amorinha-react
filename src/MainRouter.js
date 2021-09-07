import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";

import { Provider as StudentsProvider } from "./context/StudentsContext";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import StudentListPage from "./pages/StudentListPage";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import LoginPage from "./pages/LoginPage";
import ResolveAuthPage from "./pages/ResolveAuthPage";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  // const [didCheckAuthToken] = useCheckAuthToken();
  const {
    state: { token },
  } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("token") && token ? (
          children
        ) : (
          //redirect to ResolveAuthPage
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const MainRouter = () => {
  // const {
  //   state: { token },
  // } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ResolveAuthPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <StudentsProvider>
          <PrivateRoute exact path="/home">
            <HomePage />
          </PrivateRoute>
          <PrivateRoute exact path="/list">
            <StudentListPage />
          </PrivateRoute>
          <PrivateRoute exact path="/register">
            <StudentRegisterPage />
          </PrivateRoute>
          <PrivateRoute path="/student-profile/:id">
            <StudentDetailPage />
          </PrivateRoute>
          <PrivateRoute path="/list/:type">
            <StudentListPage />
          </PrivateRoute>
          <PrivateRoute path="/edit/:id">
            <StudentRegisterPage />
          </PrivateRoute>
        </StudentsProvider>
      </Switch>
    </Router>
  );
};

export default MainRouter;
