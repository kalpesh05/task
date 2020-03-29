import { store } from "../store";
import _ from "lodash";
import axios from "axios";

export function setAuthHeader() {
  deleteAuthHeader();
  const user = store.getState().user.profile;
  if (!_.isEmpty(user) && user.token) {
    axios.defaults.headers.common["Authorization"] = `Token ${user.token}`;
  }
}

export function deleteAuthHeader() {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];
}
