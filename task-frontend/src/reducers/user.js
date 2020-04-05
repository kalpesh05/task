import * as actionType from "../action/actionTypes";
import axios from "axios";
import _ from "lodash";

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case actionType.UPDATE_USER:
      if (!_.isEmpty(action.payload) && action.payload.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${action.payload.token}`;
        console.log("action.payload.token", axios.defaults.headers.common);
      } else {
        axios.defaults.headers.common["Authorization"] = "";
        delete axios.defaults.headers.common["Authorization"];
      }

      state = {
        ...state,
        user: action.payload
      };
      break;

    case actionType.USER_LOGOUT:
      axios.defaults.headers.common["Authorization"] = "";
      delete axios.defaults.headers.common["Authorization"];

      state = {
        ...state,
        profile: null
      };
      break;

    default:
      return state;
  }
  return state;
};
