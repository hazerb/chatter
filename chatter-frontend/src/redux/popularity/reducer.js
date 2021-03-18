import * as actions from "../actionTypes";

const initialState = {
  topics: [],
  users: [],
  notifications: [],
  isNotified: false,
  loading: true,
  popularLoading: true,
};

const popularGetTopicsReducer = (state, action) => {
  return {
    ...state,
    topics: action.payload,
    popularLoading: false,
  };
};

const popularGetUsersReducer = (state, action) => {
  return {
    ...state,
    users: action.payload,
    popularLoading: false,
  };
};

const getNotificationsReducer = (state, action) => {
  return {
    ...state,
    notifications: action.payload,
    isNotified: false,
    loading: false,
  };
};

const notifiedReducer = (state, action) => {
  return {
    ...state,
    isNotified: true,
  };
};

const notNotifiedReducer = (state, action) => {
  return {
    ...state,
    isNotified: false,
  };
};

const updateNotificationsReducer = (state, action) => {
  return {
    ...state,
    notifications: state.notifications.filter(
      (notification) => notification.id != action.payload
    ),
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.POPULAR_GET_TOPICS:
      return popularGetTopicsReducer(state, action);
    case actions.POPULAR_GET_USERS:
      return popularGetUsersReducer(state, action);
    case actions.GET_NOTIFICATIONS:
      return getNotificationsReducer(state, action);
    case actions.TRUE_NOTIFIED:
      return notifiedReducer(state, action);
    case actions.NOT_NOTIFIED:
      return notNotifiedReducer(state, action);
    case actions.UPDATE_NOTIFICATIONS:
      return updateNotificationsReducer(state, action);
    default:
      return state;
  }
}
