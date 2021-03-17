import * as actions from "../actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
  validationSuccessful: null,
  loginSuccessful: null,
  loginLoading: false,
  loginFailed: null,
  logoutSuccessful: 0,
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
    logoutSuccessful: !state.logoutSuccessful,
    loginFailed: null,
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
    default:
      return state;
  }
}
