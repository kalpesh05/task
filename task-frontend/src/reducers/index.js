import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import user from "./user";
export const history = createBrowserHistory();

export default combineReducers({
  user,
  router: connectRouter(history)
});
