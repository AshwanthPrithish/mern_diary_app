import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  entryCreateReducer,
  entryDeleteReducer,
  entryListReducer,
  entryUpdateReducer,
} from "./reducers/entryReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  entryList: entryListReducer,
  entryCreate: entryCreateReducer,
  entryUpdate: entryUpdateReducer,
  entryDelete: entryDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
  devTools: composeWithDevTools,
});

export default store;
