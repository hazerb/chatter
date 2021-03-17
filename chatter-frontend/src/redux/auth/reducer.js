import * as actions from "../actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
  validationSuccessful: null,
  loginSuccessful: null,
  loginLoading: false,
  loginFailed: null,
  logoutSuccessful: false,
  sameEmail: false,
};

const authLoginStartReducer = (state, action) => {
  return {
    ...state,
    loginLoading: true,
  };
};

const authLoginLoadingReducer = (state, action) => {
  return {
    ...state,
    loginLoading: false,
  };
};

const authLoginFailReducer = (state, action) => {
  return {
    ...state,
    loginLoading: false,
    loginFailed: true,
  };
};

const authLogoutReducer = (state, action) => {
  localStorage.clear();
  return {
    ...state,
    loginSuccessful: false,
    logoutSuccessful: true,
    loginFailed: null,
  };
};

const authLogoutFalseReducer = (state, action) => {
  return {
    ...state,
    logoutSuccessful: false,
  };
};

const authLoginSuccessReducer = (state, action) => {
  localStorage.setItem("token", action.payload.token);
  localStorage.setItem("user", action.payload.id);
  return {
    ...state,
    token: action.payload.token,
    user: action.payload.id,
    loginSuccessful: true,
  };
};

const authSignUpStartReducer = (state, action) => {
  return {
    ...state,
    loginLoading: true,
  };
};

const authSignUpFinishReducer = (state, action) => {
  localStorage.setItem("token", action.payload.token);
  localStorage.setItem("user", action.payload.id);
  return {
    ...state,
    token: action.payload.token,
    user: action.payload.user,
  };
};

const authValidationSuccessfulReducer = (state, action) => {
  localStorage.setItem("token", action.payload.token);
  return {
    ...state,
    token: action.payload.token,
    validationSuccessful: true,
    loginFailed: null,
  };
};

const authValidationFailReducer = (state, action) => {
  return {
    ...state,
    validationSuccessful: false,
  };
};

const authValidationNullReducer = (state, action) => {
  return {
    ...state,
    validationSuccessful: null,
  };
};

const authSameEmailReducer = (state, action) => {
  return {
    ...state,
    sameEmail: true,
  };
};

const authNotSameEmailReducer = (state, action) => {
  return {
    ...state,
    sameEmail: false,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.AUTH_LOGIN_START:
      return authLoginStartReducer(state, action);
    case actions.AUTH_LOGIN_FAIL:
      return authLoginFailReducer(state, action);
    case actions.AUTH_LOGOUT:
      return authLogoutReducer(state, action);
    case actions.AUTH_LOGIN_SUCCESSFUL:
      return authLoginSuccessReducer(state, action);
    case actions.AUTH_SIGNUP_START:
      return authSignUpStartReducer(state, action);
    case actions.AUTH_SIGNUP_FINISH:
      return authSignUpFinishReducer(state, action);
    case actions.AUTH_VALIDATION_SUCCESSFUL:
      return authValidationSuccessfulReducer(state, action);
    case actions.AUTH_VALIDATION_FAIL:
      return authValidationFailReducer(state, action);
    case actions.AUTH_LOGINLOADING_FALSE:
      return authLoginLoadingReducer(state, action);
    case actions.AUTH_VALIDATION_NULL:
      return authValidationNullReducer(state, action);
    case actions.AUTH_SAME_EMAIL:
      return authSameEmailReducer(state, action);
    case actions.AUTH_NOT_SAME_EMAIL:
      return authNotSameEmailReducer(state, action);
    case actions.AUTH_LOGOUT_FALSE:
      return authLogoutFalseReducer(state, action);
    default:
      return state;
  }
}
