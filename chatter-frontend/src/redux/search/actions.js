import * as actions from "../actionTypes";

export const searchStartAction = () => {
  return {
    type: actions.SEARCH_START,
  };
};

export const searchFinishAction = (result) => {
  return {
    type: actions.SEARCH_FINISH,
    payload: result,
  };
};

export const searchResetAction = () => {
  return {
    type: actions.SEARCH_RESET,
  };
};

export const searchGotResultAction = (response) => {
  return {
    type: actions.SEARCH_GOT_RESPONSE,
    payload: response,
  };
};
