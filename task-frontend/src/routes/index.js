import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/Login";
import TaskList from "../components/Task/TaskList";
import Taskadd from "../components/Task/Taskadd";
import AuthenticatedRoute from "./auth";

const Test = () => {
  return <h1>index</h1>;
};

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Test} />
      <Route exact path="/login" component={Login} />
      <AuthenticatedRoute path="/taskadd" component={Taskadd} />
      <AuthenticatedRoute path="/taskList" component={TaskList} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;
