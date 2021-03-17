import { Loader, Dimmer } from "semantic-ui-react";

const Loading = () => {
  return (
    <Dimmer active inverted style={{ marginTop: 75 }}>
      <Loader style={{ color: "black" }} content="Loading" />
    </Dimmer>
  );
};

export default Loading;
