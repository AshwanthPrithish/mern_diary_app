import {
  ENTRY_LIST_FAIL,
  ENTRY_LIST_REQUEST,
  ENTRY_LIST_SUCCESS,
} from "../constants/entryConstants";

export const entryListReducer = (state = { entries: [] }, action) => {
  switch (action.type) {
    case ENTRY_LIST_REQUEST:
      return { loading: true };
    case ENTRY_LIST_SUCCESS:
      return { loading: false, entries: action.payload };
    case ENTRY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
