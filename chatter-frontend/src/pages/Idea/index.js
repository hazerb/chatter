import {
  Container,
  Header,
  Segment,
  Modal,
  Button,
  Icon,
  Form,
  Comment,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Frame from "../../components/Frame";
import PopularTopics from "../../components/PopularTopics";

import {
  getTheIdea,
  getActions,
  like,
  dislike,
  save,
  notLike,
  notDislike,
  addComment,
  getComment,
} from "../../redux/idea/api";
import Loading from "../../components/Loading";
import { notifiedAction } from "../../redux/popularity/actions";

const MyIdeas = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector;

  const theIdea = selector((state) => state.idea.theIdea);
  const isLiked = selector((state) => state.idea.isLiked);
  const isDisliked = selector((state) => state.idea.isDisliked);
  const isSaved = selector((state) => state.idea.isSaved);
  const comment = selector((state) => state.idea.comments);
  const isCommented = selector((state) => state.idea.isCommented);
  const isNotification = selector((state) => state.popular.isNotified);
  const ideaLoading = selector((state) => state.idea.ideaLoading);
  const topics = selector((state) => state.popular.topics);
  const users = selector((state) => state.popular.users);

  const { id } = useParams();
  const [likeCount, setLikeCount] = useState();
  const [dislikeCount, setDislikeCount] = useState();
  const [commentCount, setCommentCount] = useState();
  const [currentComment, setComment] = useState({
    ideaId: id,
    content: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getTheIdea(id));
    dispatch(getActions(id));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch({ type: "IDEA_LOADING" });
    };
  }, []);

  useEffect(() => {
    setLikeCount(theIdea.likeCount);
    setDislikeCount(theIdea.dislikeCount);
    setCommentCount(theIdea.commentCount);
  }, [theIdea]);

  useEffect(() => {
    setCommentCount(commentCount + 1);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, [isCommented]);

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

  const [open, setOpen] = useState(false);

  const handleLike = async () => {
    setLikeCount(likeCount + 1);
    console.log("sd");
    dispatch(like(id, theIdea.owner, socket));
  };

  const handleNotLike = () => {
    setLikeCount(likeCount - 1);
    dispatch(notLike(id, theIdea.owner, socket));
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
    dispatch(dislike(id, theIdea.owner, socket));
  };

  const handleNotDislike = () => {
    setDislikeCount(dislikeCount - 1);
    dispatch(notDislike(id, theIdea.owner, socket));
  };

  const handleSave = () => {
    dispatch(save(id, theIdea.owner));
  };

  const handleAddComment = () => {
    dispatch(addComment(currentComment, theIdea.owner, socket));
    setVisible(true);
    setComment({ ...currentComment, content: "" });
    socket.emit("comment", theIdea.owner);
  };

  const handleGetComment = () => {
    dispatch(getComment(id));
  };

  return (
    <Frame
      isTrue={isNotification}
      middlePart={
        ideaLoading ? (
          <Loading section={"middle"} />
        ) : (
          <>
            <Segment>
              <Container text>
                <Header style={{ fontSize: 26 }} as="h2">
                  {theIdea.title}
                </Header>
                <p style={{ fontSize: 17 }}>{theIdea.content}</p>
                <div style={{ paddingTop: 15 }}>
                  {isLiked ? (
                    <img
                      style={{ height: 38, width: 38, cursor: "pointer" }}
                      src="/liked.png"
                      alt="image"
                      onClick={handleNotLike}
                      cursor="pointer"
                    />
                  ) : (
                    <img
                      style={{ height: 38, width: 38, cursor: "pointer" }}
                      src="/like.png"
                      alt="image"
                      onClick={handleLike}
                    />
                  )}
                  {isDisliked ? (
                    <img
                      style={{
                        height: 36,
                        width: 37,
                        marginLeft: 6,
                        cursor: "pointer",
                      }}
                      src="/disliked.png"
                      alt="image"
                      onClick={handleNotDislike}
                    />
                  ) : (
                    <img
                      style={{
                        height: 36,
                        width: 37,
                        marginLeft: 6,
                        cursor: "pointer",
                      }}
                      src="/dislike1.png"
                      alt="image"
                      onClick={handleDislike}
                    />
                  )}
                  {isSaved ? (
                    <img
                      style={{
                        height: 30,
                        width: 30,
                        marginLeft: 580,
                      }}
                      src="/saved.png"
                      alt="image"
                    />
                  ) : (
                    <img
                      style={{
                        height: 30,
                        width: 30,
                        marginLeft: 580,
                        cursor: "pointer",
                      }}
                      src="/save.png"
                      alt="image"
                      onClick={handleSave}
                    />
                  )}
                  <p style={{ marginLeft: 4, fontSize: 15 }}>
                    {likeCount} likes {dislikeCount} dislikes
                  </p>
                </div>
              </Container>
              <></>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => {
                  setOpen(true);
                  handleGetComment();
                }}
                trigger={
                  <a
                    style={{
                      fontSize: 15,
                      color: "gray",
                      paddingLeft: 14,
                      cursor: "pointer",
                    }}
                  >
                    See All {commentCount} Comments
                  </a>
                }
              >
                <Modal.Header></Modal.Header>
                <Modal.Content image scrolling>
                  <Modal.Description>
                    <h1>Comments</h1>
                    {comment.map((p) => (
                      <Comment>
                        <Comment.Content>
                          <Comment.Author style={{ fontSize: 20 }} as="a">
                            {p.user.name} {p.user.surname}
                          </Comment.Author>
                          <Comment.Metadata style={{ fontSize: 15 }}>
                            {p.createdAt.substring(0, 10)}
                          </Comment.Metadata>
                          <Comment.Text style={{ fontSize: 20 }}>
                            {p.content}
                          </Comment.Text>
                        </Comment.Content>
                      </Comment>
                    ))}
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)} primary>
                    Okay <Icon name="chevron right" />
                  </Button>
                </Modal.Actions>
              </Modal>
              <Form
                onSubmit={handleAddComment}
                style={{ paddingTop: 20 }}
                reply
              >
                <Form.TextArea
                  required="true"
                  onChange={(e) =>
                    setComment({ ...currentComment, content: e.target.value })
                  }
                  style={{ width: 700, marginLeft: 7, height: 60 }}
                  value={currentComment.content}
                />
                {visible && (
                  <h2 style={{ color: "blue" }}>Comment is posted!</h2>
                )}
                <Button
                  content="Add a Comment"
                  labelPosition="left"
                  icon="edit"
                  primary
                  style={{ width: 180, marginLeft: 8 }}
                  type="submit"
                />
              </Form>
            </Segment>
          </>
        )
      }
      rightPart={<PopularTopics topic={topics} user={users} />}
    />
  );
};

export default MyIdeas;
