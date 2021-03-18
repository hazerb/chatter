import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "../redux/auth/reducer";
import ideaReducer from "../redux/idea/reducer";
import popularReducer from "../redux/popularity/reducer";
import profileReducer from "../redux/profile/reducer";
import searchReducer from "../redux/search/reducer";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  idea: ideaReducer,
  popular: popularReducer,
  profile: profileReducer,
  search: searchReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
