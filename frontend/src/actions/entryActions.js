import axios from "axios";
import {
  ENTRY_LIST_FAIL,
  ENTRY_LIST_REQUEST,
  ENTRY_LIST_SUCCESS,
} from "../constants/entryConstants";

export const listEntries = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRY_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.get("/api/entries", config);
    dispatch({ type: ENTRY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ENTRY_LIST_FAIL, payload: message });
  }
};
