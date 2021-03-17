import { Form, Input, Button, Select } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { share } from "../../redux/idea/api";
import { ideaShareNeutralAction } from "../../redux/idea/actions";
import topics from "../Topics";

const ShareSection = ({ socket }) => {
  const dispatch = useDispatch();
  const selector = useSelector;

  const [input, setInput] = useState({
    title: "",
    topic: "Other",
    content: "",
    publishable: 1,
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const Topics = topics();

  const shareSuccessful = selector((state) => state.idea.shareSuccessful);

  const handleShare = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(share(input, 1, socket));
    clearInput();
  };

  /*const handleSave = async (e) => {
    e.preventDefault();
    dispatch(share(input, 0));
    clearInput();
  };*/

  const clearInput = () => {
    setInput({ ...input, title: "", content: "" });
  };

  useEffect(() => {
    if (shareSuccessful) {
      setVisible(true);
      setLoading(false);
      dispatch(ideaShareNeutralAction());
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [shareSuccessful]);

  return (
    <>
      <Form onSubmit={handleShare}>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Title"
            required={true}
            placeholder="Title"
            value={input.title}
            style={{ fontSize: 15 }}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
          <Form.Field
            control={Select}
            options={Topics}
            label="What's it about?"
            placeholder="Topic"
            search
            onChange={(e, data) => {
              setInput({ ...input, topic: data.value });
            }}
          />
        </Form.Group>
        <Form.Field label="Opinion" />
        <Form.TextArea
          onChange={(e) => {
            setInput({ ...input, content: e.target.value });
          }}
          placeholder="Opinion"
          value={input.content}
          required={true}
          style={{
            marginLeft: -1,
            marginTop: -8,
            padding: "10px 100px 400px 10px",
            fontSize: 17,
          }}
        />
        <Form.Field
          loading={loading}
          control={Button}
          content="Post"
          type="submit"
        />
      </Form>
      {visible && (
        <h2 style={{ color: "orange" }}>Wonderful! Idea is shared</h2>
      )}
    </>
  );
};

export default ShareSection;
