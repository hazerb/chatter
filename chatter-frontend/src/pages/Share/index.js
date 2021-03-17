import ShareSection from "../../components/ShareSection";
import Frame from "../../components/Frame";
import { notifiedAction } from "../../redux/popularity/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Share = ({ socket }) => {
  const selector = useSelector;
  const isNotification = selector((state) => state.popular.isNotified);
  const dispatch = useDispatch();

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
      middlePart={<ShareSection socket={socket} />}
    />
  );
};

export default Share;
