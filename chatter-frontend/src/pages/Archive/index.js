import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IdeaCard from "../../components/IdeaCard";
import Frame from "../../components/Frame";
import PopularTopics from "../../components/PopularTopics";

import { getSaved } from "../../redux/idea/api";
import { notifiedAction } from "../../redux/popularity/actions";
import Loading from "../../components/Loading";

const SavedIdeas = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector;
  const savedIdeas = selector((state) => state.idea.savedIdeas);
  const topics = selector((state) => state.popular.topics);
  const users = selector((state) => state.popular.users);
  const isNotification = selector((state) => state.popular.isNotified);
  const savedLoading = selector((state) => state.idea.savedLoading);
  const shouldGetSaved = selector((state) => state.idea.shouldGetSaved);

  useEffect(() => {
    if (shouldGetSaved) {
      dispatch(getSaved());
    }
  });

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

  const content = (savedLoading) => {
    switch (savedLoading) {
      case true:
        return <Loading section={"middle"} />;
      case false:
        return savedIdeas.length === 0 ? (
          <p style={{ fontSize: 20, paddingTop: 100 }}>
            You have no saved idea
          </p>
        ) : (
          savedIdeas.map((i) => <IdeaCard key={i.id} idea={i} />)
        );
    }
  };

  return (
    <Frame
      isTrue={isNotification}
      mid_style={{ paddingLeft: "100px" }}
      middlePart={content(savedLoading)}
      rightPart={<PopularTopics topic={topics} user={users} />}
    />
  );
};

export default SavedIdeas;
