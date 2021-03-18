import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IdeaCard from "../../components/IdeaCard";
import Frame from "../../components/Frame";

import { getLiked } from "../../redux/idea/api";
import PopularTopics from "../../components/PopularTopics";

import { notifiedAction } from "../../redux/popularity/actions";
import Loading from "../../components/Loading";

const LikedIdeas = ({ socket }) => {
  const dispatch = useDispatch();
  const selector = useSelector;
  const likedIdeas = selector((state) => state.idea.likedIdeas);
  const topics = selector((state) => state.popular.topics);
  const users = selector((state) => state.popular.users);
  const isNotification = selector((state) => state.popular.isNotified);
  const likedLoading = selector((state) => state.idea.likedLoading);
  const shouldGetLiked = selector((state) => state.idea.shouldGetLiked);

  useEffect(() => {
    if (shouldGetLiked) {
      dispatch(getLiked());
    }
  }, [shouldGetLiked]);

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

  const content = (likedLoading) => {
    switch (likedLoading) {
      case true:
        return <Loading section={"middle"} />;
      case false:
        return likedIdeas.length === 0 ? (
          <p style={{ fontSize: 20, paddingTop: 100 }}>
            You haven't liked any idea
          </p>
        ) : (
          likedIdeas.map((i) => <IdeaCard key={i.id} idea={i} />)
        );
    }
  };

  return (
    <Frame
      isTrue={isNotification}
      mid_style={{ paddingLeft: "100px" }}
      middlePart={content(likedLoading)}
      rightPart={<PopularTopics topic={topics} user={users} />}
    />
  );
};

export default LikedIdeas;
