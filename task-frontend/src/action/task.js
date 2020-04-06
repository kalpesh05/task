import { FETCH_TASK_LIST, CREATE_TASK } from "./actionTypes";
import axios from "axios";

export const createTask = data => async dispatch => {
  try {
    let res = await axios.post("/taskaction/create", data);
    // console.log(res);
    let resp = res.data.data;

    dispatch({
      type: CREATE_TASK,
      payload: resp
    });
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const listTask = data => async dispatch => {
  try {
    // console.log(axios.defaults.headers.common);
    let res = await axios.post("/taskaction/list", data);
    // console.log(res);
    let resp = res.data.data;

    dispatch({
      type: FETCH_TASK_LIST,
      payload: resp
    });
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
