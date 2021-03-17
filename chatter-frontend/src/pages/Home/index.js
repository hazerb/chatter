import { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Frame from "../../components/Frame";
import PopularTopics from "../../components/PopularTopics";
import { notifiedAction } from "../../redux/popularity/actions";
import Loading from "../../components/Loading";

const Home = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector;

  const topics = selector((state) => state.popular.topics);
  const users = selector((state) => state.popular.users);
  const popularLoading = selector((state) => state.popular.popularLoading);
  const isNotification = selector((state) => state.popular.isNotified);

  useEffect(() => {
    socket.on("like", () => {
      dispatch(notifiedAction());
    });
    socket.on("dislike", () => {
      dispatch(notifiedAction());
    });
    socket.on("comment", () => {
      dispatch(notifiedAction());
    });
    return () => {
      socket.off("dislike");
      socket.off("like");
      socket.off("comment");
    };
  }, []);

  useEffect(() => {
    dispatch({ type: "AUTH_LOGINLOADING_FALSE" });
  }, []);

  const content = (popularLoading) => {
    switch (popularLoading) {
      case true:
        return <Loading />;
      case false:
        return <PopularTopics topic={topics} user={users} />;
    }
  };

  return (
    <Frame
      isTrue={isNotification}
      middlePart={
        <>
          <p style={{ fontSize: 30, textAlign: "center" }}>
            WELCOME TO THE CHATTER
          </p>
        </>
      }
      rightPart={content(popularLoading)}
    />
  );
};

export default Home;
