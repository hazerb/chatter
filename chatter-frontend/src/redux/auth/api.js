import * as actions from "./actions";
import api from "../../axios";

export const login = (body) => {
  return (dispatch) => {
    dispatch(actions.authLoginStartAction());
    api()
      .post("/auth/login", body)
      .then((response) => {
        dispatch(
          actions.authLoginSuccessAction(
            response.data.accessToken,
            response.data.id
          )
        );
      })
      .catch((e) => {
        dispatch(actions.authLoginFailAction());
        console.log(e.message);
      });
  };
};

export const signUp = (body, handleRegistVisibility, handleValidVisibility) => {
  return (dispatch) => {
    dispatch(actions.authNotSameEmailAction());
    api()
      .post("/auth/signup", body)
      .then((response) => {
        handleRegistVisibility(false);
        handleValidVisibility(true);
        dispatch(
          actions.authSignUpFinishAction(
            response.data.accessToken,
            response.data.id
          )
        );
      })
      .catch((e) => {
        dispatch(actions.authSameEmailAction());
      });
  };
};

export const validateCode = (body) => {
  return (dispatch) => {
    api()
      .post("/validate", body)
      .then((response) => {
        dispatch(actions.authValidationSuccessfulAction(response.data.token));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(actions.authValidationFailAction());
      });
  };
};
