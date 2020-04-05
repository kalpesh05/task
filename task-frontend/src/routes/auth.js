import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../store";

const isAuthenticated = () => {
  // this function will check if user exist in redux store
  // also if user has token
  // returns True or False
  const user = store.getState().user.user;
  if (user && user.token) {
    return true;
  }

  return false;
};

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  // this function will make sure that current matched route is protected route or not
  // If matched route is protected and user isn't logged in, it will redirect user to
  // login page and pass the protected route as a prop so user can get back to same route
  // after login
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            referrer: { pathname: props.location.pathname }
          }}
        />
      )
    }
  />
);

export default AuthenticatedRoute;
