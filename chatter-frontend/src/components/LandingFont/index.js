import { Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const LandingFont = () => {
  return (
    <>
      <Grid.Column>
        <div
          style={{
            textAlign: "center",
            fontSize: "130px",
            fontFamily: "Philosopher",
            height: "30px",
            paddingLeft: "160px",
            paddingTop: "70px",
            color: "white",
          }}
        >
          Chatter
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontFamily: "Philosopher",
            paddingLeft: "186px",
            paddingTop: "70px",
            color: "orange",
          }}
        >
          {" "}
          Share your ideas with everyone
        </div>
      </Grid.Column>
    </>
  );
};

export default LandingFont;
