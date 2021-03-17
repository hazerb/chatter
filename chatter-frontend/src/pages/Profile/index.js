import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";

import Frame from "../../components/Frame";

import { getProfile } from "../../redux/profile/api";
import PopularTopics from "../../components/PopularTopics";

import { notifiedAction } from "../../redux/popularity/actions";
import Loading from "../../components/Loading";

const Profile = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector;

  const topics = selector((state) => state.popular.topics);
  const users = selector((state) => state.popular.users);
  const profile = selector((state) => state.profile.profile);
  const isNotification = selector((state) => state.popular.isNotified);
  const profileLoading = selector((state) => state.profile.profileLoading);

  const { id } = useParams();

  const extra = (
    <a>
      <Icon name="idea" />
      {profile.ideaCount} ideas
    </a>
  );

  const name = profile.name + " " + profile.surname;

  const description = () => {
    const user = localStorage.getItem("user");
    return user == id ? "you came up with" : "came up with";
  };

  useEffect(() => {
    dispatch(getProfile(id));
  }, [id]);

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

  return (
    <Frame
      isTrue={isNotification}
      mid_style={{ paddingLeft: "100px" }}
      middlePart={
        profileLoading ? (
          <Loading />
        ) : (
          <Card
            image="/resm.jpg"
            header={name}
            meta={profile.age + " years old"}
            description={description()}
            extra={extra}
            style={{
              paddingTop: 20,
              marginTop: 20,
              marginLeft: 110,
              fontSize: 18,
            }}
          />
        )
      }
      rightPart={<PopularTopics topic={topics} user={users} />}
    />
  );
};

export default Profile;
