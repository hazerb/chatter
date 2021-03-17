import * as actions from "../actionTypes";

const initialState = {
  loading: false,
  users: [],
  value: "",
  results: [],
};

const searchStartReducer = (state, action) => {
  return { ...state, loading: true };
};

const searchGotResponseReducer = (state, action) => {
  return { ...state, users: action.payload };
};

const searchResetReducer = (state, action) => {
  return { ...state, loading: false, users: [], value: "" };
};

const searchFinishReducer = (state, action) => {
  return { ...state, loading: false, results: action.payload };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SEARCH_START:
      return searchStartReducer(state, action);
    case actions.SEARCH_GOT_RESPONSE:
      return searchGotResponseReducer(state, action);
    case actions.SEARCH_FINISH:
      return searchFinishReducer(state, action);
    case actions.SEARCH_RESET:
      return searchResetReducer(state, action);
    default:
      return state;
  }
}
