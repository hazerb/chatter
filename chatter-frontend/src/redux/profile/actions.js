import * as actions from "../actionTypes";

export const profileGetAction = (response) => {
  return {
    type: actions.PROFILE_GET,
    payload: response,
  };
};
