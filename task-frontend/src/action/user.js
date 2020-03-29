import { UPDATE_USER, USER_LOGOUT } from "./actionTypes";
import axios from "axios";

export const login = data => async dispatch => {
  try {
    let res = await axios.post("/login", data);
    console.log(res)
    let resp = res.data;

    dispatch({
      type: UPDATE_USER,
      payload: resp
    });
    return res.data;
  } catch (e) {
      console.log(e)
    throw e;
  }
};
export const logout = () => async dispatch => {
  // try {

  dispatch({
    type: UPDATE_USER
  });
  return null;
  // }
  // catch (e) {
  //     throw e
  // }
};
