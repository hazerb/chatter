import * as actions from "../actionTypes";

export const popularGetTopicsAction = (response) => {
  return {
    type: actions.POPULAR_GET_TOPICS,
    payload: response,
  };
};

export const popularGetUsersAction = (response) => {
  return {
    type: actions.POPULAR_GET_USERS,
    payload: response,
  };
};

export const getNotificationsAction = (response) => {
  return {
    type: actions.GET_NOTIFICATIONS,
    payload: response,
  };
};

export const notifiedAction = (response) => {
  return {
    type: actions.TRUE_NOTIFIED,
  };
};

export const notNotifiedAction = (response) => {
  return {
    type: actions.NOT_NOTIFIED,
  };
};

export const updateNotificationsAction = (notificationId) => {
  return {
    type: actions.UPDATE_NOTIFICATIONS,
    payload: notificationId,
  };
};
