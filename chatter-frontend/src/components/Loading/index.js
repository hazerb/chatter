import { Loader, Dimmer } from "semantic-ui-react";

const Loading = ({ section }) => {
  return section === "middle" ? (
    <Dimmer
      active
      inverted
      style={{
        position: "fixed",
        width: 300,
        marginLeft: 600,
        marginTop: 500,
        height: 10,
      }}
    >
      <Loader style={{ color: "black" }} content="Loading" />
    </Dimmer>
  ) : (
    <Dimmer
      active
      inverted
      style={{ position: "absolute", left: "50px", top: "155px" }}
    >
      <Loader style={{ color: "black" }} content="Loading" />
    </Dimmer>
  );
};

export default Loading;
