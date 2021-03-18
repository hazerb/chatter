import { Select, Button, Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifiedAction } from "../../redux/popularity/actions";

import Frame from "../../components/Frame";
import IdeaCard from "../../components/IdeaCard";
import Topics from "../../components/Topics";
import { getNewIdeas } from "../../redux/idea/api";
import Loading from "../../components/Loading";

const NewIdeas = ({ socket }) => {
  const dispatch = useDispatch();
  const selector = useSelector;

  const newIdeas = selector((state) => state.idea.newIdeas);
  const isNotification = selector((state) => state.popular.isNotified);

  const [newIdeaVisible, setNewIdeaVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    topic: "Other",
    count: 1,
  });

  const topics = Topics();
  const numberOptions = [
    { key: "m", text: "1", value: 1 },
    { key: "f", text: "5", value: 5 },
    { key: "o", text: "10", value: 10 },
  ];

  useEffect(() => {
    setLoading(false);
    setNewIdeaVisible(true);
  }, [newIdeas]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(getNewIdeas(input.topic, input.count));
  };

  const content = (loading) => {
    switch (loading) {
      case true:
        return <Loading section={"middle"} />;
      case false:
        return newIdeas.map((i) => <IdeaCard idea={i} />);
    }
  };

  return (
    <>
      <Frame
        isTrue={isNotification}
        mid_style={{ paddingLeft: "100px" }}
        middlePart={newIdeaVisible && content(loading)}
        rightPart={
          <Form onSubmit={handleSubmit}>
            <Form.Field
              control={Select}
              options={topics}
              label="Choose topic"
              placeholder="Topic"
              search
              style={{ width: "10px" }}
              onChange={(e, data) => {
                setInput({ ...input, topic: data.value });
              }}
            />
            <Form.Field
              control={Select}
              options={numberOptions}
              label="How many of them?"
              placeholder="Count"
              search
              style={{ width: "10px" }}
              onChange={(e, data) => {
                setInput({ ...input, count: data.value });
              }}
            />
            <Button
              basic
              circular
              color="blue"
              type="submit"
              style={{
                fontSize: 24,
                borderRadius: "50%",
                padding: " 24px 8px",
                marginLeft: "60px",
                marginTop: "7px",
                textAlign: "center",
              }}
            >
              Bring
            </Button>
          </Form>
        }
      />
    </>
  );
};

export default NewIdeas;

/*<Dimmer active inverted style={{ marginTop: 150 }}>
      <Loader style={{ color: "black" }} content="Loading" />
    </Dimmer>*/
