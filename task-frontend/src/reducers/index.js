import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import user from "./user";
import task from "./task";
export const history = createBrowserHistory();

export default combineReducers({
  user,
  task,
  router: connectRouter(history)
});
