import * as actions from "./actions";
import api from "../../axios";

export const getPopularTopics = () => {
  return (dispatch) => {
    api()
      .get("/popular/topics/")
      .then((response) => {
        dispatch(actions.popularGetTopicsAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getPopularUsers = () => {
  return (dispatch) => {
    api()
      .get("/popular/users")
      .then((response) => {
        dispatch(actions.popularGetUsersAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const getNotifications = () => {
  return (dispatch) => {
    api()
      .get("/notification")
      .then((response) => {
        dispatch(actions.getNotificationsAction(response.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const deleteNotification = (id) => {
  return (dispatch) => {
    dispatch(actions.updateNotificationsAction(id));
    api()
      .delete("/notification/delete/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};

export const checkNotification = () => {
  return (dispatch) => {
    api()
      .get("/notification/is/")
      .then((response) => {
        if (response.data.notification === true) {
          dispatch(actions.notifiedAction());
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};
