import * as actions from "./actions";
import api from "../../axios";

export const getProfile = (id) => {
  return (dispatch) => {
    api()
      .get("/profile/" + id)
      .then((response) => {
        dispatch(actions.profileGetAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};
