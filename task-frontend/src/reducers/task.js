import { CREATE_CUSTOMER, FETCH_TASK_LIST } from "../action/actionTypes";
import axios from "axios";
import update from "immutability-helper";
import _ from "lodash";

const initialState = {
  list: null
};

export default (
  state = initialState,
  actionstate = initialState,
  { type, payload }
) => {
  // console.log(action.payload)
  switch (type) {
    case CREATE_CUSTOMER:
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
