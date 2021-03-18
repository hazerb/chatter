import * as actions from "./actions";
import api from "../../axios";

export const search = () => {
  return (dispatch) => {
    api()
      .get("/search")
      .then((response) => {
        dispatch(actions.searchGotResultAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const resetSearch = () => {
  return (dispatch) => {
    dispatch(actions.searchResetAction());
  };
};

export const finishSearch = (result) => {
  return (dispatch) => {
    dispatch(actions.searchFinishAction(result));
  };
};
