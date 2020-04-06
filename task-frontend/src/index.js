import "./index.scss";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { store, persistor } from "./store";
import { history } from "./reducers";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
// import Routes from "./routes/index";
import { PersistGate } from "redux-persist/integration/react";
import App from "./components/App";
import { UPDATE_USER } from "./action/actionTypes";
import axios from "axios/index";
axios.defaults.headers.common["Content-Type"] = `application/json`;
// axios.defaults.headers.common['X-Requested-With'] = `XMLHttpRequest`;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
// axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
axios.defaults.baseURL = `${process.env.REACT_APP_API_HOST}/api`;

axios.interceptors.request.use(function(config) {
  if (store.getState().user.user && store.getState().user.user.token) {
    const token = store.getState().user.user.token;
    // console.log(store.getState().user.user.token);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
/*
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // 401 means user is not authenticated, set user to empty object({})
    if (error.response && error.response.status === 401) {
      store.dispatch({
        type: UPDATE_USER,
        payload: null
      });
    }

    if (typeof error.response === "undefined") {
      // dispatch({type:constantName,errorMessage:'Network error!'});
      error = { ...error, response: { data: "Network error!" } };
    }

    if (error.response.status === 500) {
      // dispatch({type:constantName,errorMessage:'Internal server error!'});
      error = { ...error, response: { data: "Internal server error!" } };
    }

    return Promise.reject(error);
  }
);
*/
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading="Loading.." persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
