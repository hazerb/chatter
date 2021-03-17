import * as actions from "../actionTypes";

const initialState = {
  profile: {},
  profileLoading: true,
};

const profileGetReducer = (state, action) => {
  return {
    ...state,
    profile: action.payload,
    profileLoading: false,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.PROFILE_GET:
      return profileGetReducer(state, action);
    default:
      return state;
  }
}
