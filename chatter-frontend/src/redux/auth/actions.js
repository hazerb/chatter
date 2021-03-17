import * as actions from "../actionTypes";

export const authLoginStartAction = () => {
  return {
    type: actions.AUTH_LOGIN_START,
  };
};

export const authLoginSuccessAction = (token, id) => {
  return {
    type: actions.AUTH_LOGIN_SUCCESSFUL,
    payload: {
      token,
      id,
    },
  };
};

export const authLoginFailAction = () => {
  return {
    type: actions.AUTH_LOGIN_FAIL,
  };
};

export const authSignUpStartAction = () => {
  return {
    type: actions.AUTH_SIGNUP_START,
  };
};

export const authSignUpFinishAction = (token, id) => {
  return {
    type: actions.AUTH_SIGNUP_FINISH,
    payload: {
      token,
      id,
    },
  };
};

export const authValidationSuccessfulAction = (token) => {
  return {
    type: actions.AUTH_VALIDATION_SUCCESSFUL,
    payload: {
      token,
    },
  };
};

export const authValidationFailAction = (token) => {
  return {
    type: actions.AUTH_VALIDATION_FAIL,
    payload: {
      token,
    },
  };
};

export const authLogoutAction = () => {
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const authLogoutFalseAction = () => {
  return {
    type: actions.AUTH_LOGOUT_FALSE,
  };
};

export const authSameEmailAction = () => {
  return {
    type: actions.AUTH_SAME_EMAIL,
  };
};

export const authNotSameEmailAction = () => {
  return {
    type: actions.AUTH_NOT_SAME_EMAIL,
  };
};
