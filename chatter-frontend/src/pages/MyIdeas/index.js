import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IdeaCard from "../../components/IdeaCard";
import Frame from "../../components/Frame";

import { getOwnIdeas } from "../../redux/idea/api";
import PopularTopics from "../../components/PopularTopics";
import Loading from "../../components/Loading";
import { notifiedAction } from "../../redux/popularity/actions";

const MyIdeas = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector;
  const ownIdeas = selector((state) => state.idea.ownIdeas);
  const topics = selector((state) => state.popular.topics);
  const users = selector((state) => state.popular.users);
  const isNotification = selector((state) => state.popular.isNotified);
  const ownLoading = selector((state) => state.idea.ownLoading);
  const shouldGetOwn = selector((state) => state.idea.shouldGetOwn);
  const [ownIdeaCheck, setOwnIdeaCheck] = useState(false);

  useEffect(() => {
    if (shouldGetOwn) {
      dispatch(getOwnIdeas());
    }
  }, [shouldGetOwn]);

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

  const content = (ownLoading) => {
    switch (ownLoading) {
      case true:
        return <Loading section={"middle"} />;
      case false:
        return ownIdeas.length === 0 ? (
          <p style={{ fontSize: 20, paddingTop: 100 }}>You have no idea</p>
        ) : (
          ownIdeas.map((i) => <IdeaCard key={i.id} idea={i} />)
        );
    }
  };

  return (
    <Frame
      isTrue={isNotification}
      mid_style={{ paddingLeft: "100px" }}
      middlePart={content(ownLoading)}
      rightPart={<PopularTopics topic={topics} user={users} />}
    />
  );
};

export default MyIdeas;
