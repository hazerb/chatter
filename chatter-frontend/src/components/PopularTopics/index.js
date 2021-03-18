import { Segment, Item } from "semantic-ui-react";

const PopularTopics = ({ topic, user }) => {
  return (
    <>
      <Segment color="violet" style={{ marginTop: 80 }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            color: "#262a56",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Popular Topics
        </h2>
        <Item.Group relaxed>
          {topic.map((a) => (
            <Item key={a.id}>
              <h3 style={{ marginLeft: 14 }}>{a.topic}</h3>
              <h style={{ paddingTop: 2, marginLeft: 15, color: "gray" }}>
                {a.count} ideas
              </h>
            </Item>
          ))}
        </Item.Group>
      </Segment>
      <Segment color="orange" style={{ marginTop: 40 }}>
        <h2
          style={{
            fontFamily: "sans-serif",
            color: "black",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Popular Users
        </h2>
        <Item.Group relaxed>
          {user.map((a) => (
            <Item key={a.id}>
              <h3 style={{ marginLeft: 14 }}>
                {a.name} {a.surname}
              </h3>
              <h style={{ paddingTop: 2, marginLeft: 15, color: "gray" }}>
                rises {a.popularity}
              </h>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
};

export default PopularTopics;
