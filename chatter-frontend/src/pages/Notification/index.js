import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import NotificationCard from "../../components/NotificationCard";
import Frame from "../../components/Frame";

import PopularTopics from "../../components/PopularTopics";
import Loading from "../../components/Loading";

import { getNotifications } from "../../redux/popularity/api";

const Notification = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector;
  const notifications = selector((state) => state.popular.notifications);
  const topics = selector((state) => state.popular.topics);
  const users = selector((state) => state.popular.users);
  const isNotification = selector((state) => state.popular.isNotified);
  const loading = selector((state) => state.popular.loading);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  useEffect(() => {
    socket.on("like", () => {
      dispatch(getNotifications());
    });
    socket.on("dislike", () => {
      dispatch(getNotifications());
    });
    socket.on("comment", () => {
      dispatch(getNotifications());
    });
    return () => {
      socket.off("dislike");
      socket.off("like");
      socket.off("comment");
    };
  }, []);

  const content = (loading) => {
    switch (loading) {
      case true:
        return <Loading section={"middle"} />;
      case false:
        return notifications.length === 0 ? (
          <p style={{ fontSize: 20, marginLeft: 40 }}>
            You have no notification
          </p>
        ) : (
          notifications.map((i) => <NotificationCard notification={i} />)
        );
    }
  };

  return (
    <Frame
      isTrue={isNotification}
      mid_style={{ paddingLeft: "50px", paddingTop: 100 }}
      middlePart={content(loading)}
      rightPart={<PopularTopics topic={topics} user={users} />}
    />
  );
};

export default Notification;
