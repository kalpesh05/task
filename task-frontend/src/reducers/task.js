import { CREATE_TASK, FETCH_TASK_LIST } from "../action/actionTypes";
import axios from "axios";
import update from "immutability-helper";
import _ from "lodash";

const initialState = {
  list: null
};

export default (state = initialState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case CREATE_TASK:
      return update(state, { list: { $push: [payload] } });
      break;

    case FETCH_TASK_LIST:
      return update(state, { list: { $set: payload } });
      break;

    default:
      return state;
  }
  return state;
};
