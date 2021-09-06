import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useContext } from "react";

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

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const {
    state: { user },
    verifyUser,
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.email && user.password ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const MainRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <StudentsProvider>
            <PrivateRoute exact path="/">
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
      </AuthProvider>
    </Router>
  );
};

export default MainRouter;
