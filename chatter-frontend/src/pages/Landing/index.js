import React from "react";
import { Content } from "./style";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";
import AuthComponent from "../../components/AuthComponent";
import LandingFont from "../../components/LandingFont";

const Landing = () => {
  return (
    <Content>
      <Grid columns={2}>
        <LandingFont />
        <Grid.Column>
          <AuthComponent />
        </Grid.Column>
      </Grid>
    </Content>
  );
};

export default Landing;
