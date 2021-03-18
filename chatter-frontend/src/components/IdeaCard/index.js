import { Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const paragraph = <p>Hello world</p>;

const IdeaCard = ({ idea }) => {
  const history = useHistory();
  return (
    <Segment
      style={{ height: 200, width: 550, cursor: "pointer" }}
      onClick={(e) => {
        idea.title === undefined
          ? history.push(`/idea/${idea.idea.id}`)
          : history.push(`/idea/${idea.id}`);
      }}
    >
      <p
        style={{
          position: "absolute",
          left: "40px",
          top: "30px",
          fontSize: 40,
          color: "black",
        }}
      >
        {idea.title === undefined ? idea.idea.title : idea.title}
      </p>
      <p
        style={{
          position: "absolute",
          left: "50px",
          top: "155px",
          fontSize: 20,
          color: "gray",
        }}
      >
        Topic: {idea.topic === undefined ? idea.idea.topic : idea.topic}
      </p>
      <h3 style={{ position: "absolute", left: "300px", top: "134px" }}>
        Author:{"   "}
        {idea.user.name === undefined
          ? idea.idea.user.name
          : idea.user.name}{" "}
        {idea.user.surname === undefined
          ? idea.idea.user.surname
          : idea.user.surname}
      </h3>
    </Segment>
  );
};

export default IdeaCard;
